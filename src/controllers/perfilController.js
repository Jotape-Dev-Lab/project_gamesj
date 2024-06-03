var perfilModel = require("../models/perfilModel");

function editarPerfil(req, res) {
    var novaFoto = req.body.novaFoto;
    var idUsuario = req.params.idUsuario;

    perfilModel.editarPerfil(novaFoto, idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar ao trocar a foto: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { 
    editarPerfil
};
