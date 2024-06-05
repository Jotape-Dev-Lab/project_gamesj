var dashboardModal = require("../models/dashboardModal");

function buscarDadosKpi(req, res) {
    var idUsuario = req.params.idUsuario;
  
    dashboardModal.buscarDadosKpi(idUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function buscarDadosGraficoBarra(req, res) {
    var idUsuario = req.params.idUsuario;
  
    dashboardModal.buscarDadosGraficoBarra(idUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

  function buscarDadosGraficoDoug(req, res) {
    var idUsuario = req.params.idUsuario;
  
    dashboardModal.buscarDadosGraficoDoug(idUsuario).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

    module.exports = {
        buscarDadosKpi,
        buscarDadosGraficoBarra,
        buscarDadosGraficoDoug,
    }