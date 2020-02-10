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

// Rotas protegidas por login
Router.use(eAdmin);

// Rotas
Router.get('/', (req, res) => {
  res.render('admin/index', { title: 'Painel Administrativo' });
});

// Evento
Router.get('/eventos', eventosController.listarEventos);
Router.get('/cadastrar/evento', eventosController.pageCadastrarEvento);
Router.post(
  '/cadastrar/evento',
  multer(multerConfig).single('file'),
  eventosController.cadastrarEvento,
);
Router.post('/editar/evento', eventosController.editarEvento);
Router.post('/deletar/evento', eventosController.deletarEvento);

// Atleticas
Router.get('/atleticas', atleticaController.listarAtleticas);
Router.get('/cadastrar/atletica', atleticaController.pageCadastrarAtletica);
Router.post('/cadastrar/atletica',
  multer(multerConfig).single('file'),
  atleticaController.cadastrarAtletica);
Router.get('/editar/atletica/:id', atleticaController.pageEditarAtletica);
Router.post('/editar/atletica', atleticaController.editarAtletica);
Router.post('/deletar/atletica', atleticaController.deletarAtletica);

module.exports = Router;
