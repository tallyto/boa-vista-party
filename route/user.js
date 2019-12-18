const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

require("./../models/usuarioSchema");
const Usuario = mongoose.model("usuarios");

Router.get("/registro", (req, res) => {
  res.render("usuarios/registro");
});

Router.post(
  "/registro",
  [
    check("nome", "Nome menor que 3").isLength({ min: 3 }),
    check("email", "O email não é valido").isEmail(),
    check("senha", "Senha menor que 3")
      .isLength({ min: 3 })
      .custom((value, { req, loc, path }) => {
        if (value != req.body.senha2) {
          throw new Error("As senhas não sao iguais");
        } else {
          return value;
        }
      })
  ],
  (req, res) => {
    const error = validationResult(req);
    var erros = [];
    for (err of error.array()) {
      erros.push({ texto: err.msg });
    }

    if (!error.isEmpty()) {
      res.render("usuarios/registro", {
        erros: erros
      });
    } else {
      Usuario.findOne({
        email: req.body.email
      })
        .then(usuario => {
          if (usuario) {
            req.flash(
              "error_msg",
              "Já existe uma conta com esse email no nosso sistema"
            );
            res.redirect("/usuario/registro");
          } else {
            const novoUsuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              senha: req.body.senha
            });

            bcrypt.genSalt(10, (erro, salt) => {
              bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                if (erro) {
                  req.flash(
                    "error_msg",
                    "Houve um erro durante o salvamento do usuario"
                  );
                  res.redirect("/");
                }

                novoUsuario.senha = hash;

                novoUsuario
                  .save()
                  .then(() => {
                    req.flash("success_msg", "Usuário criado com sucesso!");
                    res.redirect("/");
                  })
                  .catch(erro => {
                    req.flash(
                      "error_msg",
                      "Houve um erro ao cricar o usuário tente novamente!"
                    );
                    res.redirect("/usuario/registro");
                  });
              });
            });
          }
        })
        .catch(err => {
          req.flash("error_msg", "Houve um erro ao cadastrar o usuário!");
          res.redirect("/");
        });
    }
  }
);

Router.get("/login", (req, res) => {
  res.render("usuarios/login");
});

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/usuario/login",
    failureFlash: true
  })(req, res, next);
  req.flash("success_msg", "Usuário logado com sucesso!");
});

Router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Deslogado com sucesso!");
  res.redirect("/");
});

module.exports = Router;
