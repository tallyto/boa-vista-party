const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  img: {
    name: String,
    size: Number,
    key: String,
    url: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('eventos', eventoSchema);
