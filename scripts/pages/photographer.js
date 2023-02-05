/* ---- Ce fichier comporte les éléments nécessaire à l'affichage des éléments sur la page d'un photographe après le header, soit le filtre/dropdown et le tri, l'affichage des médias en faisant appels aux classes et à la modale de carroussel ---- */

document.addEventListener("DOMContentLoaded", function () {

    /**
     * Création d'une fonction principale "main" qui va appeler les autres fonctions.
     * @async
     * @function [<main>] 
     */

    async function main() {
        let url = new URL(window.location.href); // On cible l'url.
        let id = url.searchParams.get("id"); // On récupère l'Id contenu dans l'url.
        const { photographers, media } = await getData(); // Varible qui attend de recevoir les données du photographe et des médias.
        const photographer = photographers.find(photographer => photographer.id == id) // On récupère les données du photographe correspondant à l'id de l'url.
        const medias = media.filter(medias => medias.photographerId == id) // On filtre parmis les médias ceux qui contiennent l'id retenu.

        displayData(photographer, medias) // Appel de la fonction displayData pour afficher toutes les données.
    }

    main(); // Appel de la fonction main.

    /**
     * Création d'une fonction permettant de récupérer les informations des photographes et des médias du fichier JSON.
     * @function [<getData>]
     * @returns {Promise} - Promise qui va contenir les informations relatives aux photographes et aux médias, se trouvant dans le fichier JSON.
     */
    function getData() {
        return fetch('http://localhost:5500/data/photographers.json')
            .then(function (response) {
                return response.json()
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /**
     * Création d'une fonction permettant l'affichage dynamique des données d'un photographe.
     * @function [<displayData>]
     * @param {Object} photographer - Objet qui contient toutes les informations du photographe selectionné.
     * @param {Array} medias - Tableau qui contient tous les médias relatifs au photographe selectionné.
     */
    function displayData(photographer, medias) {
        const photographerSection = document.querySelector(".photograph-header");

        // Initialisation des variable pour créer le DOM et afficher les données du photographe selectionné.
        const photographerModel = photographerFactory(photographer); // Appel de la fonction photographerFactory avec en paramètre les informations du photographe selectionné.
        const photographerDOM = photographerModel.getUser(); // Appel de la fonction getUser qui va créer le header de la page du photographe.
        photographerSection.appendChild(photographerDOM);

        // Création du label Trier par et de son dropdown menu.
        const filter = document.createElement("div");
        filter.setAttribute("id", "filter_section")
        photographerSection.appendChild(filter);
        filter.insertAdjacentHTML(
            "beforeend",
            `
            <label class="label" for="select">Trier par</label>
            <div class="select__container">
                <div id="select__container-icon">
                    <img src="/assets/icons/dropdown.png" alt="icône flèche permettant de déplier le filtre dropdown" tabindex="0"/>
                </div>
                <button id="filter" type="button" role="button" aria-haspopup="listbox" tabindex="0" aria-expanded="false">Veuillez selectionner</button>
                <div id="dropdown__menu">
                <ul id="dropdown__menu_hidden">
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Popularité">Popularité</li>
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Date">Date</li>
                    <li class="dropdown__options" tabindex="0" role="listbox" activedescendant="Titre">Titre</li>
                </ul>
                </div>
            </div>
        `
        )

        // Ajout d'un évènement au clique permettant de dérouler le menu dropdown en ajoutant la classe 'not-hidden' si elle n'est pas présente et en la retirant si elle l'est.
        const activateDropdown = document.querySelector('.select__container');
        activateDropdown.addEventListener('click', (e) => {
            const arrow = document.getElementById('select__container-icon');
            arrow.classList.toggle('isActive');
            document.getElementById('dropdown__menu').classList.toggle('not-hidden');
            document.getElementById('filter').setAttribute('aria-expanded', filter.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        })

        // Ajout d'un évènement au clique sur les boutons 'popularité', 'date' et 'titre' de tri des médias par la fonction sort().
        const select = document.getElementById('dropdown__menu_hidden')
        select.addEventListener('click', (e) => {
            medias.sort((a, b) => {
                switch (e.target.innerText) {
                    case 'Popularité':
                        if (a.likes > b.likes) {
                            return -1
                        } else {
                            return 1
                        }
                        break;
                    case 'Date':
                        if (a.date > b.date) {
                            return 1
                        } else {
                            return -1
                        }
                        break;
                    case 'Titre':
                        if (a.title > b.title) {
                            return 1
                        } else {
                            return -1
                        }
                        break;
                }
            })
            mediaSection.innerHTML = '';
            displayMedias(medias); // Appel de la fonction displayMedias pour effectuer un nouvel affichage des médias selon le tri choisi.
        })

        // Création d'une boucle sur les trois boutons du menu de tri et ajout d'un évènement à la pression de la touche 'entrer' sur le clavier pour lancer la fonction de tri.
        const selectAccessibility = document.getElementsByClassName('dropdown__options')
        for (let i = 0; i < selectAccessibility.length; i++) {
            selectAccessibility[i].addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    selectAccessibility[i].click(); // Appel de la fonction similaire au clique.
                }
            });
        }

        // Initialisation des variables pour créer le DOM des médias.
        const section = document.createElement("section");
        const mediaSection = photographerSection.appendChild(section);
        mediaSection.classList.add("mediaCard")


        /**
         * Création d'une boucle pour afficher tous les médias correspondant au photographe. 
         * @param {Array} medias - Tableau de tous les médias à afficher. 
         */
        const displayMedias = (medias) => {

            for (let i = 0; i < medias.length; i++) {
                if (medias[i].image) { // Si le média contient une image.
                    let imageMedia = new ImageMedia(medias[i]) // Création d'une nouvelle instance de la classe ImageMedia.
                    let article = imageMedia.createMedia(); // Appel de la fonction createMedia de la classe ImageMedia.

                    mediaSection.appendChild(article);

                } else { // Si le média contient une vidéo.
                    let videoMedia = new VideoMedia(medias[i]) // Création d'une nouvelle instance de la classe VideoMedia.
                    let article = videoMedia.createMedia();// Appel de la fonction createMedia de la classe VideoMedia.

                    mediaSection.appendChild(article);
                }
            }

            let totalLikes = photographerModel.calculateTotalLikes(); // Appel de la fonction calculateTotalLikes.
            document.getElementById("totalLikes").innerHTML = totalLikes;
        }

        displayMedias(medias); // Appel de la fonction displayMedias.
        initMediasModal(medias); // Appel de la fonction iniMediaModal pour créer la modale de carroussel.

        // Ajout de l'évènement au clique sur le bouton contact pour display la modale de contact.
        const buttonContact = document.querySelector('.contact_button')
        buttonContact.addEventListener('click', () => {
            displayModal(photographer)
        })
    };

})
