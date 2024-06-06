var express = require("express");
var router = express.Router();

var forumController = require("../controllers/forumController");

router.get("/atividade", function (req, res) {
    forumController.atividade(req, res);
});

router.get("/tema", function (req, res) {
    forumController.tema(req, res);
});

router.get("/listar", function (req, res) {
    forumController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    forumController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    forumController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    forumController.publicar(req, res);
});

module.exports = router;