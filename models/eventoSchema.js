const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Título"
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
    required: true
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
mongoose.model("eventos", eventoSchema);
