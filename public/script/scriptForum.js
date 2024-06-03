document.addEventListener('DOMContentLoaded', function () {

    let nome = sessionStorage.getItem('NOME_USER');
    let perfil = sessionStorage.getItem('PERFIL_USER');

    const btnSession = document.querySelector('.btn-bar');
    const userSession = document.querySelector('.user-logon');

    if (btnSession && userSession) {
        if (nome == undefined && perfil == undefined) {
            btnSession.style.display = 'flex';
            userSession.style.display = 'none';
        } else {

            const divPerfil = document.querySelector('#div_perfil');
            const divUser = document.querySelector('#div_user');

            divPerfil.style.backgroundImage = `url(perfil/${perfil}.png)`;
            divUser.innerHTML = nome;

            btnSession.style.display = 'none';
            userSession.style.display = 'flex';
        }
    } else {
        console.error("Os elementos 'btn-bar' ou 'user-logon' não foram encontrados no DOM.");
    }

    const estrelas = document.querySelectorAll('.btn-publicar .fa-star');

    estrelas.forEach(estrela => {
        estrela.addEventListener('click', function () {
            const indice = estrela.getAttribute('data-index');
            console.log(`Estrela ${indice} clicada`);

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


