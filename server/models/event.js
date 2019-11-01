const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventModel = new schema({
  id: { type: String, required: true },
  status: { type: String },
});

module.exports = mongoose.model('events', eventModel);
