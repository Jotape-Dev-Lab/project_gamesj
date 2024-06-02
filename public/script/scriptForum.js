document.addEventListener('DOMContentLoaded', function () {
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


