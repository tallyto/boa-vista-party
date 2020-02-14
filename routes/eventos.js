// Express
const { Router } = require('express');

const routes = Router();

const Eventos = require('../models/eventoSchema');

// Rotas
routes.get('/', async (req, res) => {
  const eventos = await Eventos.find();
  res.render('eventos', { eventos, title: 'Eventos' });
});

// routes.get('/projeto-x', (req, res) => {
//   res.render('eventos/projeto-x');
// });

module.exports = routes;
