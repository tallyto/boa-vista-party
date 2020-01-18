/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style

// Express
const express = require('express');

const Router = express.Router();

const mongoose = require('mongoose');
require('../models/atleticaSchema');

const Atleticas = mongoose.model('atleticas');

// Routes
Router.get('/', async (req, res) => {
  const atleticas = await Atleticas.find().sort({ title: 1 });
  res.render('atleticas', { atleticas, title: 'Atléticas' });
});


Router.get('/alfa', (req, res) => {
  res.render('atleticas/alfa', { title: 'Atlética Alfa' });
});

Router.get('/guerreira', (req, res) => {
  res.render('atleticas/guerreira', { title: 'Atlética Guerreira' });
});

Router.get('/heroica', (req, res) => {
  res.render('atleticas/heroica', { title: 'Atlética Heróica' });
});

Router.get('/impetuosa', (req, res) => {
  res.render('atleticas/impetuosa', { title: 'Atlética Impetuosa' });
});

Router.get('/mercenaria', (req, res) => {
  res.render('atleticas/mercenaria', { title: 'Atlética Mercenária' });
});

Router.get('/nexus', (req, res) => {
  res.render('atleticas/nexus', { title: 'Atlética Nexus' });
});

Router.get('/soberanos', (req, res) => {
  res.render('atleticas/soberanos', { title: 'Atlética Soberanos' });
});

Router.get('/suprema', (req, res) => {
  res.render('atleticas/suprema', { title: 'Atlética Suprema' });
});

module.exports = Router;
