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
      ON p.fkUsuario = u.idUsuario
      ORDER BY 1 desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atividade() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atividade()"
  );
  var instrucaoSql = `
    select count(fkUsuario) as maisAtivos, 
    u.nome,
    u.fotoPerfil
    from post as p
    right join usuario as u
    on u.idUsuario = p.fkUsuario
    group by p.fkUsuario, u.nome, u.fotoPerfil
    order by 1 desc
    limit 3;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function tema() {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atividade()"
  );
  var instrucaoSql = `
      select ifnull(count(fkJogo), 0) as 'Quantidade de post', j.nome 
      from post as p
      right join jogos as j
      on j.idJogo = p.fkJogo
      group by fkJogo, j.nome
      order by 1 desc
      limit 3;
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

module.exports = {
  tema,
  atividade,
  listar,
  listarPorUsuario,
  pesquisarDescricao,
  publicar,
};
