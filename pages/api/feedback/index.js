// const express = require('express');
// const router = express.Router();
const Feedback = require('../models/feedback');

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

  const { text } = req.body;

  if (req.method === 'GET') {
    try {
      const event = await Feedback.find({});

      res.status(200).send(event);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else if (req.method === 'POST') {
    try {
      const event = new Feedback({
        text,
      });
      const events = await event.save();

      res.status(200).send(events);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
