/* ---- Dans ce fichier se trouve la factory function "photographerFactory", initialement présente sur le repo, complétée afin de pouvoir afficher les renseignements relatifs aux photographes sur les différentes pages du site. ---- */

/**
    * Initialisation de la fonction photographerFactory, laquelle disposant de trois fonctions internes pour afficher un photographe sur la page d'accueil, le header dans la page d'un photographe ainsi que le nombre total de like dont il dispose. 
    * @function [<photographerFactory>]
    * @param {Object} data - Contient les informations relatives à un photographe.
    * @param {String} picture - Chemin relié à l'image de profil du photographe.
    * @returns {Object} Retourne un objet avec les propriété suivantes: name, picture, getUserCardDOM, getUser, calculateTotalLikes.
*/
function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
        * Initialisation de la fonction getUserCardDOM permettant de créer dans le DOM un article contenant les informations relatives à chaque photographe, cette fonction est utilisée pour générer les différents photographes sur la page d'accueil. 
        * @function [<getUserCardDOM>]
        * @returns {HTMLArticleElement} Retourne un élément HTML "article".
    */
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <a href="./photographer.html?id=${id}" tabindex="0">
                    <img src="${picture}" alt="Photo de profil de ${name}">
                    <h2>${name}</h2>
                </a>        
                <h3>${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price" aria-label="Le coût de prestation de ${name} est de ${price}€ par jour.">${price}€/jour</p>
            `
        );

        return (article);
    }

    /**
        * Initialisation de la fonction getUser permettant de créer dans le DOM une section contenant les informations relatives à un photographe, cette fonction est utilisée pour générer le header de la page d'un photographe. 
        * @function [<getUser>]
        * @returns {HTMLArticleElement} Retourne un élément HTML "section".
    */
    function getUser() {
        const photographerCard = document.createElement('section');

        photographerCard.classList.add("photographerCard")
        photographerCard.insertAdjacentHTML(
            "beforeend",
            `
                <div class="informations">
                    <h1 tabindex="0">${name}</h1>
                    <h2 tabindex="0">${city}, ${country}</h2>
                    <p class="tagline" tabindex="0">${tagline}</p>
                </div>  
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                <img src="${picture}" alt="${name}" class="userPicture" tabindex="0">
                <div class="dayPrice">
                <div class="likes"><p tabindex="0" id="totalLikes">X</p><img class="heart2" src="assets/icons/Heart2.png" alt="icône coeur symbolisant le total de like du photographe" tabindex="0"/></div>
                <p tabindex="0">${price}€/jour</p>
                </div>
            `
        )

        return (photographerCard)
    }

    /**
        * Initialisation de la fonction calculateTotalLikes permettant de calculer le nombre total de likes d'un photographe. 
        * @function [<getUser>]
        * @returns {number} Retourne le nombre total de like en additionnant le like de chaque média d'un photographe.
    */
    function calculateTotalLikes() {

        let totalLikes = 0;
        let allLikes = document.getElementsByClassName('likes');

        for (let i = 1; i < allLikes.length; i++) {
            totalLikes += parseInt(allLikes[i].textContent);
        }

        return totalLikes;
    }

    return { name, picture, getUserCardDOM, getUser, calculateTotalLikes }
}