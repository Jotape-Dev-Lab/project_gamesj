document.addEventListener('DOMContentLoaded', function() {
    let nome = sessionStorage.getItem('nome');
    let perfil = sessionStorage.getItem('perfil');

    const btnSession = document.querySelector('.btn-bar');
    const userSession = document.querySelector('.user-logon');

    if (btnSession && userSession) {
        if (nome === null && perfil === null) {
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
});


let proximo = document.querySelector('.proximo');
let anterior = document.querySelector('.anterior');

proximo.addEventListener('click', function(){
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});

anterior.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]);
});