/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style

// Express
const express = require('express');

const Router = express.Router();

// Mongo DB
const mongoose = require('mongoose');
require('../models/eventoSchema');
require('../models/atleticaSchema');

const Eventos = mongoose.model('eventos');
const Atleticas = mongoose.model('atleticas');
// Multer
const multer = require('multer');
const multerConfig = require('../config/multer');

// Helpers
const { eAdmin } = require('../helpers/eAdmin');

// Rotas
Router.get('/', eAdmin, (req, res) => {
  res.render('admin/index');
});

Router.get('/eventos', eAdmin, async (req, res) => {
  const eventos = await Eventos.find();
  res.render('admin/eventos', { eventos });
});

Router.get('/atleticas', eAdmin, async (req, res) => {
  const atleticas = await Atleticas.find();
  res.render('admin/atleticas', { atleticas });
});

Router.get('/cadastrar/evento', eAdmin, (req, res) => {
  res.render('admin/cadastrar-evento');
});

Router.get('/cadastrar/atletica', eAdmin, (req, res) => {
  res.render('admin/cadastrar-atletica');
});

Router.post(
  '/cadastrar/evento',
  eAdmin,
  multer(multerConfig).single('file'),
  eAdmin,
  async (req, res) => {
    const { title, description, slug } = req.body;
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;

    const newEvento = {
      title,
      description,
      slug,
      img: {
        name,
        size,
        key,
        url,
      },
    };

    const erros = [];

    try {
      await Eventos.create(newEvento);
      req.flash('success_msg', 'Evento criado com sucesso!');
      res.redirect('/eventos');
    } catch (error) {
      erros.push({ texto: 'Houve um erro ao cadastrar o evento!' });
      res.render('admin/cadastrar-evento', {
        erros,
      });
    }
  },
);

Router.get('/editar/evento/:id', eAdmin, async (req, res) => {
  const { id } = req.params;
  const evento = await Eventos.findById({ _id: id });
  res.render('admin/editar-evento', { evento });
});

Router.post('/editar/evento', eAdmin, async (req, res) => {
  const {
    id, title, description, slug,
  } = req.body;

  try {
    const evento = await Eventos.findById({ _id: id });
    evento.title = title;
    evento.description = description;
    evento.slug = slug;
    evento.save();
    req.flash('success_msg', 'Evento editado com sucesso!');
    res.redirect('/eventos');
  } catch (error) {
    req.flash('error_msg', 'Houve um erro ao editar o evento!');
    res.redirect('/admin/eventos');
  }
});

Router.post('/deletar/evento', eAdmin, async (req, res) => {
  const { id } = req.body;
  const erros = [];

  try {
    await Eventos.findByIdAndDelete({ _id: id });
    req.flash('success_msg', 'Evento removido com sucesso!');
    res.redirect('/eventos');
  } catch (error) {
    erros.push({ texto: 'Houve um erro ao deletar o evento!' });
    res.render('admin/eventos', {
      erros,
    });
  }
});

module.exports = Router;
