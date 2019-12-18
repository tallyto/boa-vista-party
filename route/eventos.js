//Express
const express = require("express");
const Router = express.Router();

//Rotas
Router.get("/projeto-x", (req, res) => {
  res.render("eventos/projeto-x");
});

module.exports = Router;
