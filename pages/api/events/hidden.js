// const express = require('express');
// const router = express.Router();
const Event = require('../models/event');

// const Event = Even;

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
  //   const { id } = req.body;

  try {
    const events = await Event.find({ status: 'hidden' });

    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
