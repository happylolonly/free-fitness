// const express = require('express');
// const router = express.Router();
const Event = require('../models/event');

const { VK } = require('vk-io');

// const Event = Even;

const vk = new VK({
  token:
    process.env.TOKEN || '4e82e2084e82e2084e82e208a74ee4c61044e824e82e208151f9677d3d62856454ed2e6',
});

let cachedDb = null;

const mongoose = require('mongoose');

console.log('ds', process.env.MONGODB_URI);

async function dbConnect() {
  if (cachedDb) {
    return;
  }
  try {
    cachedDb = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    // Even.init();
  } catch (error) {
    console.log(error);
  }
}

async function run(search, limit, offset) {
  const response = await vk.api.wall.search({
    domain: 'free_fitness_minsk',
    query: search,
    count: limit,
    offset: offset,
  });

  return response;
}

async function get(limit, offset) {
  const response = await vk.api.wall.get({
    domain: 'free_fitness_minsk',
    //   query: search,
    count: limit,
    offset: offset,
  });

  return response;
}

export default async (req, res) => {
  await dbConnect();

  // const Event = mongoose.model('events');

  const { search, limit = 10, offset = 0 } = req.query;
  const t = search ? await run(search, limit, offset) : await get(limit, offset);

  try {
    // TODO: refactor
    const events = await Event.find({});

    const mergedEvents = [];

    // remove events with status 'hidden'
    const newT = t.items.forEach(vkEvent => {
      const vkE = vkEvent.copy_history ? vkEvent.copy_history[0] : vkEvent;
      const { owner_id, id } = vkE;
      const dbEvent = events.find(event => {
        return `${owner_id}_${id}` === event.vkId;
      });

      if (dbEvent) {
        if (dbEvent.status === 'hidden') {
          return;
        }

        vkE.serverData = dbEvent;
      }

      mergedEvents.push(vkE);
    });

    t.items = mergedEvents;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    res.send(JSON.stringify(t));
  } catch (error) {
    console.log(error);
    res.status(500).send(JSON.stringify(t));
  }
};

// module.exports = router;
