/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style

// Express
const express = require('express');

const Router = express.Router();
const mongoose = require('mongoose');
require('../models/eventoSchema');

const Eventos = mongoose.model('eventos');

// Rotas
Router.get('/', async (req, res) => {
  const eventos = await Eventos.find();
  res.render('eventos', { eventos, title: 'Eventos' });
});

// Router.get('/projeto-x', (req, res) => {
//   res.render('eventos/projeto-x');
// });

module.exports = Router;
