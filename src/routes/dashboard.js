var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarDadosKpi/:idUsuario", function (req, res) {
    dashboardController.buscarDadosKpi(req, res);
});

router.get("/buscarDadosGraficoBarra/:idUsuario", function (req, res) {
    dashboardController.buscarDadosGraficoBarra(req, res);
});

router.get("/buscarDadosGraficoDoug/:idUsuario", function (req, res) {
    dashboardController.buscarDadosGraficoDoug(req, res);
});

module.exports = router;