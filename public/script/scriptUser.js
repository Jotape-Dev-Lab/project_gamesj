document.addEventListener("DOMContentLoaded", function () {
  let nome = sessionStorage.getItem("NOME_USER");
  let perfil = sessionStorage.getItem("PERFIL_USER");

  const divPerfil = document.querySelector("#img_user");
  const divUser = document.querySelector("#nome_user");

  divPerfil.style.backgroundImage = `url(perfil/${perfil}.png)`;
  divUser.innerHTML = nome;
});

function limparSessao() {
  sessionStorage.clear();
}

function editarPerfil(fotoNova) {
  fetch(`/perfil/editarPerfil/${sessionStorage.getItem("ID_USER")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      novaFoto: fotoNova,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert(
          "Foto atualizada com sucesso pelo usuario de email: " +
            sessionStorage.getItem("EMAIL_USER") +
            "!"
        );
        sessionStorage.setItem("PERFIL_USER", fotoNova);
        window.location = "./indexUser.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar editar a foto de perfil! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}


function buscarDadosKpi() {

    let idUsuario = sessionStorage.ID_USER;

  fetch(`/dashboard/buscarDadosKpi/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          // div_comentarios.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          let positivo = resposta[0].positivo
          let neutro = resposta[0].neutro
          let negativo = resposta[0].negativo
          let qtdPost = resposta[0].qtdPost

          kpiPositivo.innerHTML = positivo;
          kpiNeutro.innerHTML = neutro;
          kpiNegativo.innerHTML = negativo;
          kpiQuantidade.innerHTML = qtdPost;

          // finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      // finalizarAguardar();
    });
}

function buscarDadosGraficoBarra() {

    let idUsuario = sessionStorage.ID_USER;

  fetch(`/dashboard/buscarDadosGraficoBarra/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          // div_comentarios.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          let estrela1 = resposta[0].estrela1;
          let estrela2 = resposta[0].estrela2;
          let estrela3 = resposta[0].estrela3;
          let estrela4 = resposta[0].estrela4;
          let estrela5 = resposta[0].estrela5;

          const graficoDeBarra = document.getElementById("graficoBarra");

          new Chart(graficoDeBarra, {
            type: "bar",
            data: {
              labels: [
                "1 Estrela",
                "2 Estrelas",
                "3 Estrelas",
                "4 Estrelas",
                "5 Estrelas",
              ],
              datasets: [
                {
                  label: "Quantidade de Estrelas",
                  data: [estrela1, estrela2, estrela3, estrela4, estrela5],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          // finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      // finalizarAguardar();
    });
}

function buscarDadosGraficoDoug() {

    let idUsuario = sessionStorage.ID_USER;

  fetch(`/dashboard/buscarDadosGraficoDoug/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          // div_comentarios.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          let braw = resposta[0].braw;
          let mine = resposta[0].mine;
          let poke = resposta[0].poke;
          let rock = resposta[0].rock;
          let vava = resposta[0].vava;

          const image = new Image();
          image.src = "./icon/rosaClaro.png";

          const plugin = {
            id: "customCanvasBackgroundImage",
            beforeDraw: (chart) => {
              if (image.complete) {
                const ctx = chart.ctx;
                const { top, left, width, height } = chart.chartArea;
                const imageWidth = 80;
                const imageHeight = 80;
                const x = left + width / 2 - imageWidth / 2;
                const y = top + height / 2 - imageHeight / 2;
                ctx.drawImage(image, x, y, imageWidth, imageHeight);
              } else {
                image.onload = () => chart.draw();
              }
            },
          };

          const graficoDePizza = document.getElementById("graficoDoughnut").getContext("2d");

          new Chart(graficoDePizza, {
            type: "doughnut",
            plugins: [plugin],
            data: {
              labels: [
                "Brawlhalla",
                "Minecraft",
                "Pokémon",
                "Rocket League",
                "Valorant",
              ],
              datasets: [
                {
                  label: "Quantidade de Postagem",
                  data: [braw, mine, poke, rock, vava],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  display: false, // Remove as linhas de grade do eixo X
                },
                y: {
                  display: false, // Remove as linhas de grade do eixo Y
                },
              },
            },
          });

          // finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      // finalizarAguardar();
    });
}
