var database = require("../database/config");

function buscarDadosKpi(idUsuario) {
  console.log(
    "ACESSEI O DASH MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosKpi()"
  );
  var instrucaoSql = `
        select
        (select count(avaliacao)
        from post
        where avaliacao < 3 and fkUsuario = ${idUsuario}) as negativo,
        (select count(avaliacao)
        from post
        where avaliacao = 3 and fkUsuario = ${idUsuario}) as neutro,
        (select count(avaliacao)
        from post
        where avaliacao > 3 and fkUsuario = ${idUsuario}) as positivo,
        (select count(postagem) from post where fkUsuario = ${idUsuario}) as qtdPost;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarDadosGraficoBarra(idUsuario) {
    console.log(
      "ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosGraficoBarra()"
    );
    var instrucaoSql = `
    select
    (select count(avaliacao) from post where avaliacao = 1 and fkUsuario = ${idUsuario}) as estrela1,
    (select count(avaliacao) from post where avaliacao = 2 and fkUsuario = ${idUsuario}) as estrela2,
    (select count(avaliacao) from post where avaliacao = 3 and fkUsuario = ${idUsuario}) as estrela3,
    (select count(avaliacao) from post where avaliacao = 4 and fkUsuario = ${idUsuario}) as estrela4,
    (select count(avaliacao) from post where avaliacao = 5 and fkUsuario = ${idUsuario}) as estrela5;
      `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function buscarDadosGraficoDoug(idUsuario) {
    console.log(
      "ACESSEI O DASH  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosGraficoDoug()"
    );
    var instrucaoSql = `
    select
    (select ifnull(count(p.fkJogo), 0)
    from jogos as j
    left join post as p
    on p.fkJogo = j.idJogo and p.fkUsuario = ${idUsuario}
    where j.nome = 'Brawlhalla'
    group by fkJogo, j.nome) as braw,
    (select ifnull(count(p.fkJogo), 0)
    from jogos as j
    left join post as p
    on p.fkJogo = j.idJogo and p.fkUsuario = ${idUsuario}
    where j.nome = 'Minecraft'
    group by fkJogo, j.nome) as mine,
    (select ifnull(count(p.fkJogo), 0)
    from jogos as j
    left join post as p
    on p.fkJogo = j.idJogo and p.fkUsuario = ${idUsuario}
    where j.nome = 'Rocket League'
    group by fkJogo, j.nome) as rock,
    (select ifnull(count(p.fkJogo), 0)
    from jogos as j
    left join post as p
    on p.fkJogo = j.idJogo and p.fkUsuario = ${idUsuario}
    where j.nome = 'Valorant'
    group by fkJogo, j.nome) as vava,
    (select ifnull(count(p.fkJogo), 0)
    from jogos as j
    left join post as p
    on p.fkJogo = j.idJogo and p.fkUsuario = ${idUsuario}
    where j.nome = 'Pokémon'
    group by fkJogo, j.nome) as poke;
      `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    buscarDadosKpi,
    buscarDadosGraficoBarra,
    buscarDadosGraficoDoug,
}