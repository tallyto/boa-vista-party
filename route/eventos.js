const express = require("express");
const Router = express.Router();

Router.get("/projeto-x",(req, res) => {
    res.render("eventos/projeto-x")
})



module.exports = Router