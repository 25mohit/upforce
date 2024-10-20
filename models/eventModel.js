const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
