/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */

const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model de usuário
require('./../models/usuarioSchema');

const Usuario = mongoose.model('usuarios');

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      (email, senha, done) => {
        Usuario.findOne({ email }).then((usuario) => {
          if (!usuario) {
            return done(null, false, { message: 'Esta conta não existe!' });
          }

          bcrypt.compare(senha, usuario.senha, (erro, batem) => {
            if (batem) {
              return done(null, usuario);
            }
            return done(null, false, { message: 'Senha incorreta!' });
          });
        });
      },
    ),
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
  });
};
