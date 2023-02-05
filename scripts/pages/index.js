document.addEventListener("DOMContentLoaded", function () {

    /**
     * Création d'une fonction principale "main" qui va appeler les autres fonctions.
     * @async
     * @function [<main>] 
     */
    async function main() {

        const { photographers } = await getPhotographers(); // Varible qui attend de recevoir les données des photographes.
        displayData(photographers); // Appel de la fonction displayData avec en paramètre les données reçus.
    };

    main(); // Appel de la fonction main.

    /**
     * Création d'une fonction permettant de récupérer les informations des photographes du fichier JSON.
     * @function [<getPhotographers>]
     * @returns {Promise} - Promise qui va contenir les informations relatives aux photographes se trouvant dans le fichier JSON.
     */
    function getPhotographers() {
        return fetch('http://localhost:5500/data/photographers.json')
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /**
     * Création d'une fonction pour intégrer/afficher au HTML les données provenant de l'API
     * @function [<displayData>]
     * @param {Array} photographers - Tableau de tous les photographes contenant toutes leurs informations.
     */
    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer); // Appel de la fonction photographerFactory avec en paramètre les informations des photographes.
            const userCardDOM = photographerModel.getUserCardDOM(); // Appel de la fonction getUser qui va générer les différents photographes
            photographersSection.appendChild(userCardDOM);
        });
    };

})