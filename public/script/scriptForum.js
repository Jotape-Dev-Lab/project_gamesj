const ratingValue = document.getElementById('ratingValue');

document.addEventListener('DOMContentLoaded', function () {

    let nome = sessionStorage.getItem('NOME_USER');
    let perfil = sessionStorage.getItem('PERFIL_USER');

    const btnSession = document.querySelector('.btn-bar');
    const userSession = document.querySelector('.user-logon');
    const comentSession = document.querySelector('.forum-publicar');

    if (btnSession && userSession) {
        if (nome == undefined && perfil == undefined) {
            btnSession.style.display = 'flex';
            userSession.style.display = 'none';
            comentSession.style.display = 'none';
        } else {
            const divPerfil = document.querySelector('#div_perfil');
            const divUser = document.querySelector('#div_user');

            divPerfil.style.backgroundImage = `url(perfil/${perfil}.png)`;
            icon_user.style.backgroundImage = `url(perfil/${perfil}.png)`;
            divUser.innerHTML = nome;

            btnSession.style.display = 'none';
            userSession.style.display = 'flex';
            comentSession.style.display = 'flex';
        }
    } else {
        console.error("Os elementos 'btn-bar' ou 'user-logon' não foram encontrados no DOM.");
    }

    const estrelas = document.querySelectorAll('.btn-publicar .fa-star');

    estrelas.forEach(estrela => {
        estrela.addEventListener('click', function () {
            const indice = estrela.getAttribute('data-index');
            ratingValue.value = indice;

            estrelas.forEach((e, i) => {
                if (i < indice) {
                    e.classList.remove('fa-regular', 'star-empty');
                    e.classList.add('fa-solid', 'star-yellow');
                } else {
                    e.classList.remove('fa-solid', 'star-yellow');
                    e.classList.add('fa-regular', 'star-empty');
                }
            });
        });
    });
});

    function publicar() {

        event.preventDefault();

        var idUsuario = sessionStorage.ID_USER;

        var corpo = {
            jogo: form_postagem.select_jogo.value,
            postagem: form_postagem.text_postagem.value,
            avaliacao: form_postagem.ratingValue.value,
        }

        fetch(`/forum/publicar/${idUsuario}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");
                window.location = "indexForum.html";
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

        return false;

    }

let listaDeCores = ['#6E36FF', '#6FBD3B', '#FFA305', '#CC3412', '#FFDF03', '#E402FF', '#3739FF', '#2DFFB2', '#B2FFBC', '#C49DFF', '#3F8CFF'];

function atualizarFeed() {
    fetch("/forum/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_comentarios.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.querySelector(".forum-enviados");
                feed.innerHTML = "";
                for (
                    let i = 0; 
                    i < resposta.length; 
                    i++
                ) {
                    let publicacao = resposta[i]; 
                    let numeroAleatorio = Math.floor(Math.random() * 11);
                    let colorNome = listaDeCores[numeroAleatorio];

                    var nome = publicacao.nome; 
                    var postagem = publicacao.postagem;
                    var jogo = publicacao.fkJogo;
                    var avaliacao = publicacao.avaliacao;
                    var perfilAtual = publicacao.fotoPerfil;

                    let temaJogo = "";

                    if (jogo == 1) {
                        temaJogo = "Minecraft";
                    } else if (jogo == 2) {
                        temaJogo = "Rocket League";
                    } else if (jogo == 3) {
                        temaJogo = "Brawlhalla";
                    } else if (jogo == 4) {
                        temaJogo = "Valorant";
                    } else if (jogo == 5) {
                        temaJogo = "Pokémon";
                    }

                   div_comentarios.innerHTML += `
                   
                   <div class="enviado">
                   <div class="user">
                     <div class="icon" style="background-image: url(perfil/${perfilAtual}.png);"></div>
   
                     <div class="name" style="color: ${colorNome}; font-weight: 600">${nome}</div>
                   </div>
   
                   <div class="content">
                   <p class="tema">${temaJogo}</p>
                     <p>
                       ${postagem}
                     </p>
                   </div>

                   <div class="avaliacao"></div>

                   `

                   estrelasRestantes = avaliacao

                   let divAvaliacao = document.querySelectorAll('.enviado .avaliacao')
                   let divAvaliacaoAtual = divAvaliacao[i]

                    for(
                        rodada = 0;
                        rodada < avaliacao;
                        rodada++
                    ) {
                    if (estrelasRestantes > 0) {   
                        let iconeEstrela = document.createElement('i')
                        divAvaliacaoAtual.appendChild(iconeEstrela)
                        iconeEstrela.classList.add('fa-solid', 'fa-star', 'star-yellow');
                    } else {
                        let iconeEstrela = document.createElement('i')
                        divAvaliacaoAtual.appendChild(iconeEstrela)
                        iconeEstrela.classList.add('fa-regular', 'fa-star', 'star-empty');
                    }
                    estrelasRestantes--
                }
                
                div_comentarios.innerHTML += `<hr />
                </div>`

                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function atividade() {
    fetch("/forum/atividade").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                user_atividade.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var userAtividade = document.querySelector("#user_atividade");
                userAtividade.innerHTML = "";
                for (
                    let i = 0; 
                    i < resposta.length; 
                    i++
                ) {

                    let numeroAleatorio = Math.floor(Math.random() * 11);
                    let colorNome = listaDeCores[numeroAleatorio];

                    let atividadeRecente = resposta[i]; 

                    let usuario = atividadeRecente.nome
                    let perfil = atividadeRecente.fotoPerfil
                    let qtdComentarios = atividadeRecente.maisAtivos
                    
                    userAtividade.innerHTML += `
                    
                    <div class="users-lin">
                        <div class="users-perfil">
                            <div class="user-perfil-comment">
                                <div class="user-perfil">
                                    <div class="icon" style="background-image: url(perfil/${perfil}.png);"></div>
                                    <p style="color: ${colorNome}; font-weight: 600;">${usuario}</p>
                                </div>
                                <div class="user-comment">
                                    <h1> Comentários: ${qtdComentarios}</h1>
                                </div>
                            </div>
                        <hr>
                    </div>
                    
                    `;
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}


function tema() {
    fetch("/forum/tema").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                jogo_tema.innerHTML = `<h1> Nenhum resultado encontrado. </h1>`;
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var jogoTema = document.querySelector("#jogo_tema");
                jogoTema.innerHTML = "";
                for (
                    let i = 0; 
                    i < resposta.length; 
                    i++
                ) {

                    let temasComentados = resposta[i]; 

                    let jogos = temasComentados.nome;
                    
                    jogoTema.innerHTML += `
                    
                    <div class="users-lin">
                        <p>${i + 1}. ${jogos}</p>
                        <hr>
                    </div>
                    
                    `;
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

