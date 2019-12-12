const express = require("express");
const Router = express.Router();

Router.get("/alfa", (req, res) => {
  res.render("atleticas/alfa");
});

Router.get("/mercenaria", (req, res) => {
  res.render("atleticas/mercenaria");
});

Router.get("/nexus", (req, res) => {
  res.render("atleticas/nexus");
});

Router.get("/impetuosa", (req, res) => {
  res.render("atleticas/impetuosa");
});

Router.get("/suprema", (req, res) => {
  res.render("atleticas/suprema");
});

module.exports = Router;
