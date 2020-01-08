/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */

// Express
const express = require('express');

const Router = express.Router();

// Mongo db
const mongoose = require('mongoose');
require('../models/usuarioSchema');

const Usuario = mongoose.model('usuarios');

const bcrypt = require('bcrypt');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const { eAdmin } = require('./../helpers/eAdmin');

Router.get('/cadastro', eAdmin, (req, res) => {
  res.render('usuarios/registro');
});

Router.post(
  '/registro', eAdmin,
  [
    check('nome', 'O nome precisa ter no minimo 3 caracteres!').isLength({
      min: 3,
    }),
    check('email', 'O email não é valido!').isEmail(),
    check('senha', 'A senha precisa ter no minimo 4 caracteres!')
      .isLength({ min: 4 })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.senha2) {
          throw new Error('As senhas não são iguais!');
        } else {
          return value;
        }
      }),
  ],
  (req, res) => {
    const erros = [];
    const error = validationResult(req);
    for (err of error.array()) {
      erros.push({ texto: err.msg });
    }

    if (!error.isEmpty()) {
      res.render('usuarios/registro', {
        erros,
      });
    } else {
      Usuario.findOne({
        email: req.body.email,
      })
        .then((usuario) => {
          if (usuario) {
            req.flash(
              'error_msg',
              'Já existe uma conta com esse email no nosso sistema!',
            );
            res.redirect('/usuario/registro');
          } else {
            const novoUsuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              senha: req.body.senha,
            });

            bcrypt.genSalt(10, (erro, salt) => {
              bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                if (erro) {
                  req.flash('error_msg', 'Houve ao criar o usuário!');
                  res.redirect('/');
                }

                novoUsuario.senha = hash;

                novoUsuario
                  .save()
                  .then(() => {
                    req.flash('success_msg', 'Usuário criado com sucesso!');
                    res.redirect('/');
                  })
                  .catch((erro) => {
                    req.flash(
                      'error_msg',
                      'Houve um erro ao criar o usuário tente novamente!',
                    );
                    res.redirect('/usuario/registro');
                  });
              });
            });
          }
        })
        .catch((err) => {
          req.flash('error_msg', 'Houve um erro ao cadastrar o usuário!');
          res.redirect('/');
        });
    }
  },
);

Router.get('/login', (req, res) => {
  res.render('usuarios/login');
});

Router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuario/login',
    failureFlash: true,
  })(req, res, next);
});

Router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'Deslogado com sucesso!');
  res.redirect('/');
});

module.exports = Router;
