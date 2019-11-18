const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventModel = new schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

// module.exports = eventModel;
let model;
try {
  model = mongoose.model('feedback');
} catch (error) {
  model = mongoose.model('feedback', eventModel);
}

module.exports = model;
