//Express
const express = require("express");

//MongoDB
const mongoose = require("mongoose");
const Router = express.Router();

//Models
require("./../models/atleticaSchema");
require("./../models/eventoSchema");
const atleticaSchema = mongoose.model("atleticas");
const eventoSchema = mongoose.model("eventos");

//Helpers
const { eAdmin } = require("./../helpers/eAdmin");

//Rotas
Router.get("/", eAdmin, (req, res) => {
  res.render("admin/index");
});

Router.get("/atletica", eAdmin, (req, res) => {
  res.render("admin/add-atletica");
});

Router.post("/atletica/add", eAdmin, async (req, res) => {
  const newAtletica = ({ title, description, slug, imgSrc } = req.body);
  try {
    await atleticaSchema.create(newAtletica);
    req.flash("success_msg", "Atlética criada com sucesso!");
    res.redirect("/atleticas");
  } catch (error) {
    req.flash("error_msg", "Houve um erro ao cadastrar a atlética!");
    res.redirect("/admin/atletica");
  }
});

Router.get("/evento", eAdmin, (req, res) => {
  res.render("admin/add-evento");
});

Router.post("/evento/add", eAdmin, async (req, res) => {
  const newEvento = ({ title, description, slug, imgSrc } = req.body);
  try {
    await eventoSchema.create(newEvento);
    req.flash("success_msg", "Evento cadastrado com sucesso!");
    res.redirect("/eventos");
  } catch (error) {
    if (error) {
      req.flash("error_msg", "Houve um erro ao cadastrar o evento");
      res.redirect("/admin/evento");
    }
  }
});

module.exports = Router;
