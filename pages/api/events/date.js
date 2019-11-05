// const express = require('express');
// const router = express.Router();
const Event = require('../models/event');

let cachedDb = null;

const mongoose = require('mongoose');

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

export default async (req, res) => {
  await dbConnect();

  const { date, id } = req.body;

  if (!Array.isArray(date)) {
    res.status(410).send('Wrong format');
  }

  console.log(date);

  try {
    await Event.update(
      { id: id },
      {
        date: date.map(item => Date.parse(new Date(item)) || null), // fix
      },
      { upsert: true }
    );

    res.status(200).send('ok');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
