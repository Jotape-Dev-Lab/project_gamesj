document.addEventListener('DOMContentLoaded', function () {
    let nome = sessionStorage.getItem('NOME_USER');
    let perfil = sessionStorage.getItem('PERFIL_USER');

    const divPerfil = document.querySelector('#img_user');
    const divUser = document.querySelector('#nome_user');

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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            novaFoto: fotoNova
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Foto atualizada com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USER") + "!");
            sessionStorage.setItem('PERFIL_USER', fotoNova)
            window.location = "./indexUser.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar editar a foto de perfil! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

