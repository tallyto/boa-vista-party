/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line linebreak-style

// Express
const express = require('express');

const Router = express.Router();

// Controllers
const multer = require('multer');
const atleticaController = require('./../controllers/adminAtleticas');
const eventosController = require('./../controllers/adminEventos');

// Multer
const multerConfig = require('../config/multer');

// Helpers
const { eAdmin } = require('../helpers/eAdmin');

// Rotas
Router.get('/', eAdmin, (req, res) => {
  res.render('admin/index', { title: 'Painel Administrativo' });
});

// Evento
Router.get('/eventos', eAdmin, eventosController.listarEventos);
Router.get('/cadastrar/evento', eAdmin, eventosController.pageCadastrarEvento);
Router.post(
  '/cadastrar/evento',
  eAdmin,
  multer(multerConfig).single('file'),
  eventosController.cadastrarEvento,
);
Router.post('/editar/evento', eAdmin, eventosController.editarEvento);
Router.post('/deletar/evento', eAdmin, eventosController.deletarEvento);

// Atleticas
Router.get('/atleticas', eAdmin, atleticaController.listarAtleticas);
Router.get('/cadastrar/atletica', eAdmin, atleticaController.pageCadastrarAtletica);
Router.post('/cadastrar/atletica', eAdmin,
  multer(multerConfig).single('file'),
  eAdmin,
  atleticaController.cadastrarAtletica);
Router.post('/editar/atletica', eAdmin, atleticaController.editarAtletica);
Router.post('/deletar/atletica', eAdmin, atleticaController.deletarAtletica);

module.exports = Router;
