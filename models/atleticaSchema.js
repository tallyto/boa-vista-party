const mongoose = require('mongoose');

const { Schema } = mongoose;

const atleticaSchema = new Schema({
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

mongoose.model('atleticas', atleticaSchema);
