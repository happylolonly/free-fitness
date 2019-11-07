const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventModel = new schema(
  {
    vkId: { type: String },
    status: { type: String },
    date: {
      type: Array,
      of: Date,
    },
    location: { type: String },
    title: { type: String },
    text: { type: String },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

// module.exports = eventModel;
let model;
try {
  model = mongoose.model('events');
} catch (error) {
  model = mongoose.model('events', eventModel);
}

module.exports = model;
