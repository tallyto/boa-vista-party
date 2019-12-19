//Express
const express = require("express");
const Router = express.Router();

//Helpers
const { eAdmin } = require("./../helpers/eAdmin");

//Rotas
Router.get("/", eAdmin, (req, res) => {
  res.render("admin/index");
});

Router.get("/cadastrar/evento", (req, res) => {
  res.render("admin/add-evento");
});

module.exports = Router;
