const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  imgSrc: {
    type: String,
    default: "/img/default.png"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
eventoSchema.plugin(uniqueValidator);
mongoose.model("atleticas", eventoSchema);
