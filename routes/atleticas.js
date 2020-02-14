// Express
const { Router } = require('express');

const routes = Router();

const Atleticas = require('../models/atleticaSchema');

// Routes
routes.get('/', async (req, res) => {
  const atleticas = await Atleticas.find().sort({ title: 1 });
  res.render('atleticas', { atleticas, title: 'Atléticas' });
});

routes.get('/alfa', (req, res) => {
  res.render('atleticas/alfa', { title: 'Atlética Alfa' });
});

routes.get('/guerreira', (req, res) => {
  res.render('atleticas/guerreira', { title: 'Atlética Guerreira' });
});

routes.get('/heroica', (req, res) => {
  res.render('atleticas/heroica', { title: 'Atlética Heróica' });
});

routes.get('/impetuosa', (req, res) => {
  res.render('atleticas/impetuosa', { title: 'Atlética Impetuosa' });
});

routes.get('/mercenaria', (req, res) => {
  res.render('atleticas/mercenaria', { title: 'Atlética Mercenária' });
});

routes.get('/soberanos', (req, res) => {
  res.render('atleticas/soberanos', { title: 'Atlética Soberanos' });
});

routes.get('/suprema', (req, res) => {
  res.render('atleticas/suprema', { title: 'Atlética Suprema' });
});

module.exports = routes;
