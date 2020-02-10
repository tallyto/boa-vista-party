// Express
const express = require('express');

const Router = express.Router();

// Controllers
const multer = require('multer');
const AtleticaController = require('./../controllers/AtleticaController');
const EventosController = require('./../controllers/EventosController');

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
Router.get('/eventos', EventosController.listarEventos);
Router.get('/cadastrar/evento', EventosController.pageCadastrarEvento);
Router.post(
  '/cadastrar/evento',
  multer(multerConfig).single('file'),
  EventosController.cadastrarEvento,
);
Router.get('/editar/evento/:id', EventosController.pageEditarEvento);
Router.post('/editar/evento', EventosController.editarEvento);
Router.post('/deletar/evento', EventosController.deletarEvento);

// Atleticas
Router.get('/atleticas', AtleticaController.listarAtleticas);
Router.get('/cadastrar/atletica', AtleticaController.pageCadastrarAtletica);
Router.post('/cadastrar/atletica',
  multer(multerConfig).single('file'),
  AtleticaController.cadastrarAtletica);
Router.get('/editar/atletica/:id', AtleticaController.pageEditarAtletica);
Router.post('/editar/atletica', AtleticaController.editarAtletica);
Router.post('/deletar/atletica', AtleticaController.deletarAtletica);

module.exports = Router;
