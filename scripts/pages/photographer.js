document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {
        let url = new URL(window.location.href); /* On cible l'url*/
        let id = url.searchParams.get("id"); /* On récupère l'Id contenu dans l'url*/
        const { photographers, media } = await getData(); /* Varible qui attend de recevoir les données du photographe et des médias*/
        const photographer = photographers.find(photographer => photographer.id == id) /*On récupère les données du photographe correspondant à l'id de l'url*/
        const medias = media.filter(medias => medias.photographerId == id) /*On filtre parmis les médias ceux qui contiennent l'id retenu*/

        displayData(photographer, medias)
    }

    main();

    // Création d'une fonction permettant de récupérer les informations d'un produit selectionné
    function getData() {
        return fetch('http://localhost:5500/data/photographers.json')
            .then(function (response) {
                return response.json()
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /* Création d'une fonction permettant l'affichage dynamique des données*/
    function displayData(photographer, medias) {
        const photographerSection = document.querySelector(".photograph-header");

        /* Initialisation d'une variable pour créer le DOM et afficher les données du photographe selectionné*/
        const photographerModel = photographerFactory(photographer);
        const photographerDOM = photographerModel.getUser();
        photographerSection.appendChild(photographerDOM);

        /* Création du label Trier par et de son dropdown menu*/
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
                <button id="filter" type="button" role="listbox" aria-expended="false" aria-level="button to open select menu" tabindex="0">Veuillez selectionner</button>
                <div id="dropdown__menu">
                <ul id="dropdown__menu_hidden">
                    <li class="dropdown__options" tabindex="0">Popularité</li>
                    <li class="dropdown__options" tabindex="0">Date</li>
                    <li class="dropdown__options" tabindex="0">Titre</li>
                </ul>
                </div>
            </div>
        `
        )

        const activateDropdown = document.querySelector('.select__container');
        activateDropdown.addEventListener('click', (e) => {
            const arrow = document.getElementById('select__container-icon');
            arrow.classList.toggle('isActive');
            document.getElementById('dropdown__menu').classList.toggle('not-hidden');
        })

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
            displayMedias(medias);

        })

        const selectAccessibility = document.getElementsByClassName('dropdown__options')
        for (let i = 0; i < selectAccessibility.length; i++) {
            selectAccessibility[i].addEventListener('keydown', (e) => {
                if (e.key === "Enter") {
                    selectAccessibility[i].click();
                }
            });
        }

        /* Initialisation des variables pour créer le DOM des médias*/
        const section = document.createElement("section");
        const mediaSection = photographerSection.appendChild(section);
        mediaSection.classList.add("mediaCard")

        /* Création d'une boucle pour afficher tous les médias correspondant au photographe*/
        const displayMedias = (medias) => {

            for (let i = 0; i < medias.length; i++) {
                if (medias[i].image) {
                    let imageMedia = new ImageMedia(medias[i])
                    let article = imageMedia.createMedia();

                    mediaSection.appendChild(article);

                } else {
                    let videoMedia = new VideoMedia(medias[i])
                    let article = videoMedia.createMedia();

                    mediaSection.appendChild(article);
                }
            }

            let totalLikes = photographerModel.calculateTotalLikes();
            document.getElementById("totalLikes").innerHTML = totalLikes;
        }

        displayMedias(medias);
        initMediasModal(medias);

    };

})
