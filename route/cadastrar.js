const express = require("express");
const Router = express.Router();
const multer = require("multer");
const multerConfig = require("./../config/multer");
const mongoose = require("mongoose");
const Evento = mongoose.model("eventos");
//Helpers
const { eAdmin } = require("./../helpers/eAdmin");

Router.post(
  "/evento",
  multer(multerConfig).single("file"),
  eAdmin,
  async (req, res) => {
    const { title, description, slug } = req.body;
    const {originalname: name, size, key , location: url = ""} = req.file

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
    Evento.create(newEvento)
      .then(() => {
        req.flash("success_msg", "Evento criado com sucesso!");
        res.redirect("/eventos");
      })
      .catch(erro => {
        erros.push({ texto: "Houve um erro ao cadastrar o evento" });
        res.render("admin/add-evento", {
          erros: erros
        });
      });
  }
);

module.exports = Router;
