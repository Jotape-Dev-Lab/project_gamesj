var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucaoSql = `
  SELECT 
    p.idPostagem AS idPostagem,
    p.postagem,
    p.fkJogo,
    p.avaliacao,
    p.fkUsuario,
    u.idUsuario AS idUsuario,
    u.nome,
    u.email,
    u.senha,
    u.fotoPerfil
FROM post p
  INNER JOIN usuario u
      ON p.fkUsuario = u.idUsuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  );
  var instrucaoSql = `
  SELECT 
  p.idPostagem AS idPostagem,
  p.postagem,
  p.fkJogo,
  p.avaliacao,
  p.fkUsuario,
  u.idUsuario AS idUsuario,
  u.nome,
  u.email,
  u.senha,
  u.fotoPerfil
FROM post p
INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                    WHERE p.postagem LIKE '${texto}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()"
  );
  var instrucaoSql = `
  SELECT 
  p.idPostagem AS idPostagem,
  p.postagem,
  p.fkJogo,
  p.avaliacao,
  p.fkUsuario,
  u.idUsuario AS idUsuario,
  u.nome,
  u.email,
  u.senha,
  u.fotoPerfil
FROM post p
INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario
                    WHERE u.idUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function publicar(postagem, jogo, avaliacao, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",
    postagem,
    jogo,
    avaliacao,
    idUsuario
  );
  var instrucaoSql = `
        INSERT INTO post (postagem, fkJogo, avaliacao, fkUsuario) VALUES ('${postagem}', ${jogo}, ${avaliacao}, ${idUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editar(novaDescricao, idAviso) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    novaDescricao,
    idAviso
  );
  var instrucaoSql = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletar(idAviso) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    idAviso
  );
  var instrucaoSql = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  listarPorUsuario,
  pesquisarDescricao,
  publicar,
  editar,
  deletar,
};
