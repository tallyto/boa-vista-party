//Express
const express = require("express");
const Router = express.Router();

const mongoose = require("mongoose");
require("./../models/eventoSchema");
const Eventos = mongoose.model("eventos");

//Multer
const multer = require("multer");
const multerConfig = require("./../config/multer");

//Helpers
const { eAdmin } = require("./../helpers/eAdmin");

//Rotas
Router.get("/", eAdmin, (req, res) => {
  res.render("admin/index");
});

Router.get("/eventos", eAdmin, async (req, res) => {
  const eventos = await Eventos.find();
  res.render("admin/eventos", { eventos: eventos });
});

Router.get("/cadastrar/evento", eAdmin, (req, res) => {
  res.render("admin/cadastrar-evento");
});

Router.post(
  "/cadastrar/evento",
  eAdmin,
  multer(multerConfig).single("file"),
  eAdmin,
  async (req, res) => {
    const { title, description, slug } = req.body;
    const { originalname: name, size, key, location: url = "" } = req.file;

    const newEvento = {
      title,
      description,
      slug,
      img: {
        name,
        size,
        key,
        url
      }
    };

    var erros = [];
    Eventos.create(newEvento)
      .then(() => {
        req.flash("success_msg", "Evento criado com sucesso!");
        res.redirect("/eventos");
      })
      .catch(erro => {
        erros.push({ texto: "Houve um erro ao cadastrar o evento!" });
        res.render("admin/cadastrar-evento", {
          erros: erros
        });
      });
  }
);

Router.get("/editar/evento/:id", eAdmin, async (req, res) => {
  const { id } = req.params;
  const evento = await Eventos.findById({ _id: id });
  res.render("admin/editar-evento", { evento: evento });
});

Router.post("/editar/evento", eAdmin, (req, res) => {
  const { id, title, description, slug } = req.body;
  Eventos.findById({ _id: id }).then(evento => {
    evento.title = title;
    evento.description = description;
    evento.slug = slug;

    evento
      .save()
      .then(() => {
        req.flash("success_msg", "Evento editado com sucesso!");
        res.redirect("/eventos");
      })
      .catch(erro => {
        req.flash("error_msg", "Houve um erro ao editar o evento!");
        res.redirect("/admin/eventos");
      });
  });
});

Router.post("/deletar/evento", eAdmin, (req, res) => {
  const { id } = req.body;
  var erros = [];
  Eventos.findByIdAndDelete({ _id: id })
    .then(() => {
      req.flash("success_msg", "Evento removido com sucesso!");
      res.redirect("/eventos");
    })
    .catch(() => {
      erros.push({ texto: "Houve um erro ao deletar o evento!" });
      res.render("admin/eventos", {
        erros: erros
      });
    });
});

module.exports = Router;
