let nome = sessionStorage.getItem('nome');
let fotoPerfil = sessionStorage.getItem('fotoPerfil');


const divPerfil = document.querySelector('#img_user');
const divUser = document.querySelector('#nome_user');

divPerfil.style.backgroundImage = `url(perfil/${fotoPerfil}.png)`;
divUser.innerHTML = nome;