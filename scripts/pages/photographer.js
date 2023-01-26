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
        const dropdown = document.createElement("label");
        filter.appendChild(dropdown);
        dropdown.setAttribute("for", "filter")
        dropdown.innerHTML = "Trier par";
        dropdown.insertAdjacentHTML(
            "beforeend",
            `
            <select name="filter" id="filter">
            <option value="" class="options" style="display: none">Veuillez selectionner</option>
            <option value="likes" class="options">Popularité</option>
            <option value="date" class="options">Date</option>
            <option value="title" class="options">Titre</option>
            </div>    
            `
        )

        const select = document.getElementById('filter');

        select.addEventListener('change', (e) => {
            const selected = select.querySelector('[value=' + document.getElementById('filter').value + ']')

            select.querySelectorAll('option:not([value=""])').forEach((o, i) => {
                o.style.display = 'block'
            })
            selected.style.display = 'none'
            medias.sort((a, b) => {
                switch (e.target.value) {
                    case 'likes':
                        if (a.likes > b.likes) {
                            return -1
                        } else {
                            return 1
                        }
                        break;
                    case 'date':
                        if (a.date > b.date) {
                            return 1
                        } else {
                            return -1
                        }
                        break;
                    case 'title':
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
