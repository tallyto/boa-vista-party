/* eslint-disable no-shadow */
// Express
const { Router } = require('express');

const routes = Router();

// Mongo db

const bcrypt = require('bcrypt');
const passport = require('passport');
const Yup = require('yup');
const Usuario = require('../models/usuarioSchema');

routes.get('/cadastro', (req, res) => {
  res.render('usuarios/registro', { title: 'Boa Vista Party - Cadastro' });
});

routes.post(
  '/registro',
  async (req, res) => {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .min(3)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .min(4)
        .required(),
      senha2: Yup.string().oneOf([Yup.ref('senha'), null]),
    });

    if (await schema.isValid(req.body)) {
      Usuario.findOne({
        email: req.body.email,
      })
        .then((usuario) => {
          if (usuario) {
            req.flash(
              'error_msg',
              'O email informado já possui cadastro no site',
            );
            res.redirect('/usuario/cadastro');
          } else {
            const novoUsuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              senha: req.body.senha,
            });

            bcrypt.genSalt(10, (erro, salt) => {
              bcrypt.hash(novoUsuario.senha, salt, async (erro, hash) => {
                if (erro) {
                  req.flash('error_msg', 'Erro ao cadastrar usuário');
                  res.redirect('/usuario/cadastro');
                }

                novoUsuario.senha = hash;

                await novoUsuario
                  .save()
                  .then(() => {
                    req.flash('success_msg', 'Usuário cadastrado com sucesso');
                    res.redirect('/');
                  })
                  .catch((erro) => {
                    req.flash(
                      'error_msg',
                      'Houve um erro ao criar o usuário, tente novamente',
                    );
                  });
              });
            });
          }
        })
        .catch((err) => {
          req.flash('error_msg', 'Houve um erro ao cadastrar o usuário');
          res.redirect('/usuario/cadastro');
        });
    } else {
      req.flash('error_msg', 'Dados invalidos');
      res.redirect('/usuario/cadastro');
    }
  },
);

routes.get('/login', (req, res) => {
  res.render('usuarios/login', { title: 'Boa Vista Party - Entrar' });
});

routes.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuario/login',
    failureFlash: true,
  })(req, res, next);
});

routes.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'Deslogado com sucesso!');
  res.redirect('/');
});

module.exports = routes;
