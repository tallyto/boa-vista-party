//Express
const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
require("./../models/eventoSchema");
const Eventos = mongoose.model("eventos");

//Rotas
Router.get("/", async (req, res) => {
  const eventos = await Eventos.find();
  res.render("eventos", { eventos: eventos });
});

Router.get("/projeto-x", (req, res) => {
  res.render("eventos/projeto-x");
});

module.exports = Router;
