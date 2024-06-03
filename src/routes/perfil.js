var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

// Rota PUT para editar o perfil, capturando idUsuario como parâmetro
router.put("/editarPerfil/:idUsuario", function (req, res) {
    perfilController.editarPerfil(req, res);
});

module.exports = router;
