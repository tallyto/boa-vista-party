const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventoSchema = new Schema({
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

mongoose.model('eventos', eventoSchema);
