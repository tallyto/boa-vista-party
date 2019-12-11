const express = require("express");
var handlebars = require("express-handlebars");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/eventos", (req, res) => {
  res.render("eventos");
});

app.get("/eventos-passados", (req, res) => {
  res.render("eventos-passados");
});

app.get("/atleticas", (req, res) => {
  res.render("atleticas");
});

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta http://localhost:3001");
});
