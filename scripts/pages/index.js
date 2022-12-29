document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {

        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    main();

    // Création d'une fonction pour récupérer les données de l'API
    async function getPhotographers() {
        return fetch('http://localhost:5500/data/photographers.json')
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Création d'une fonction pour intégrer/afficher au HTML les données provenant de l'API
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

})