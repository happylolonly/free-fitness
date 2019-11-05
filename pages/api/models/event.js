const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventModel = new schema({
  id: { type: String, required: true },
  status: { type: String },
  date: {
    type: Array,
    of: Date,
  },
});

// module.exports = eventModel;
let model;
try {
  model = mongoose.model('events');
} catch (error) {
  model = mongoose.model('events', eventModel);
}

module.exports = model;
