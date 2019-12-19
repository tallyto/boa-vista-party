//Express
const express = require("express");
var handlebars = require("express-handlebars");
const serveStatic = require("serve-static");
var favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

//Autenticação
const passport = require("passport");
require("./config/auth")(passport);

//MongoDB
const MongoDB = require("./config/mongoDB");

//Node
const path = require("path");

//Rotas
const Atleticas = require("./route/atleticas");
const Eventos = require("./route/eventos");
const Admin = require("./route/admin");
const User = require("./route/user");

//Sessão
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(flash());

//Auth
app.use(passport.initialize());
app.use(passport.session());

//Variaveis global
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//MongoDB
const Db = new MongoDB();
Db.ConnectProduction()
  .then(() => console.log("Conexão efefutada com o banco de dados"))
  .catch(error => {
    console.log("erro: " + error);
  });


//Rotas
app.use("/atleticas", Atleticas);
app.use("/eventos", Eventos);
app.use("/admin", Admin);
app.use("/usuario", User);

app.get("/", (req, res) => {
  res.render("eventos");
});

app.get("/eventos", (req, res) => {
  res.render("eventos");
});

app.get("/eventos-passados", (req, res) => {
  res.render("eventos-passados");
});

app.get("/atleticas", (req, res) => {
  res.render("atleticas");
});

app.get("/contato", (req, res) => {
  res.render("contato/index");
});

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta http://localhost:3001");
});
