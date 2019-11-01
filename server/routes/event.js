const express = require('express');
const router = express.Router();
const Event = require('../models/event');

const { VK } = require('vk-io');

const vk = new VK({
  token:
    process.env.TOKEN || '4e82e2084e82e2084e82e208a74ee4c61044e824e82e208151f9677d3d62856454ed2e6',
});

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

router.get('/', async (req, res) => {
  const { search, limit = 30, offset = 0 } = req.query;
  const t = search ? await run(search, limit, offset) : await get(limit, offset);

  try {
    // TODO: refactor
    const events = await Event.find({ status: 'hidden' });

    // remove events with status 'hidden'
    const newT = t.items.filter(({ owner_id, id }) => {
      return !events.find(event => {
        return `${owner_id}_${id}` === event.id;
      });
    });

    t.items = newT;

    res.send(JSON.stringify(t));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify(t));
  }
});

router.post('/hide', async (req, res) => {
  console.log('here');
  debugger;
  const { id } = req.body;
  console.log(id);

  try {
    await Event.update(
      { id: id },
      {
        status: 'hidden',
      },
      { upsert: true }
    );

    res.send('ok');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
