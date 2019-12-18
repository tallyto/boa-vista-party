const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");

const eventoSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Título",
    unique: true
  },
  description: {
    type: String,
    required: true,
    default: "Descrição"
  },
  isActive: {
    type: Boolean,
    default: true
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
mongoose.model("eventos", eventoSchema);
