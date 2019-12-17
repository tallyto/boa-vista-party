const express = require("express");
var handlebars = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const Atleticas = require("./route/atleticas");
const Eventos = require("./route/eventos");
const app = express();

/*
//Database
const mongoose = require('mongoose');
require ("./models/eventoSchema")
const eventoSchema = mongoose.model("eventos")
*/

//Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*
mongoose.connect('mongodb://localhost:27017/party', { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
  console.log("Banco de dados concetado com sucesso!")
}).catch((error)=>{
  console.log("Error: " + error)
})

app.get("/cadastrar", (req, res)=>{
  const newEvento = {
    title: "Meu evento",
    description: "Minha descrição",
    slug: "evento",
  }
  eventoSchema.create(newEvento).then((evento)=>{
    res.json(evento)
  }).catch((error)=>{
    res.json(error)
  })
})

app.get("/eventos-fake",async (req, res)=>{
  const eventosDb = await eventoSchema.find()
  res.render("eventos-fake", {eventos: eventosDb})

})
*/

app.get("/", (req, res) => {
  res.render("eventos");
});

app.use("/atleticas", Atleticas);
app.use("/eventos", Eventos);

app.get("/eventos", (req, res) => {
  res.render("eventos");
});

app.get("/eventos-passados", (req, res) => {
  res.render("eventos-passados");
});

app.get("/atleticas", (req, res) => {
  res.render("atleticas");
});

app.get("/contato", (req, res)=>{
  res.render("contato/index")
})

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta http://localhost:3001");
});
