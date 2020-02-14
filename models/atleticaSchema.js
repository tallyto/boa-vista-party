const mongoose = require('mongoose');

const atleticaSchema = new mongoose.Schema({
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
  img: {
    name: String,
    size: Number,
    key: String,
    url: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('atleticas', atleticaSchema);
