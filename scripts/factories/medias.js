/* ---- Dans ce fichier se trouve les trois class utilisées pour la création de médias selon la Factory method pattern.----*/

/**
    * La classe Medias représente la structure de base pour tous les types de médias.
    * @class
*/
class Medias {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média.
        * @constructor
        * @param {Object} data - Object contenant les informations du média.
        * @param {string} data.title - Le titre du média.
        * @param {number} data.likes - Le nombre de likes du média.
        * @param {number} data.id - l'ID unique du média.
    */
    constructor(data) {
        const { date, id, likes, photographerId, price, title } = data;
        this.title = title;
        this.likes = likes;
        this.id = id;
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média dans le DOM HTML.
        * @function [<createMedia>]
        * @return {HTMLElement} - Retourne un élément HTML <article> qui représente le média.
    */
    createMedia() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <div class ="descriptionPicture">
                    <p tabindex="0">${this.title}</p>
                    <div class="likes"><p tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/Heart.png" alt="icône coeur permettant de liker un média"/></div>
                </div>  
            `
        )

        let likeHeart = article.getElementsByClassName('heart')[0]
        likeHeart.addEventListener('click', function incLike(e) { // Ajout de l'évènement au clique sur un coeur permettant de liker un média.

            likeHeart.classList.add('heartliked');
            let likeValue = parseInt(e.target.parentElement.textContent)
            let intValue = e.target.parentElement.querySelector('p')
            let totalLikes = document.getElementById("totalLikes")

            intValue.innerHTML = likeValue + 1;
            totalLikes.innerHTML = parseInt(totalLikes.textContent) + 1;

            likeHeart.removeEventListener('click', incLike) // Retrait de l'évènement une fois un like effectué.
        })

        likeHeart.addEventListener('keydown', (e) => { // Ajout de l'évènement à l'appui sur la touche "entrée" sur un coeur permettant de liker un média.
            if (e.key === 'Enter') {
                likeHeart.click();
            }
        })

        return (article);
    }
}

/**
    * La classe ImageMedia représente la structure d'un média particulier de type image et bénéficie de la structure de base de la class Médias par extension.
    * @class
    * @extends Medias
*/
class ImageMedia extends Medias {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média de type image.
        * @constructor
        * @function super - Récupération des datas de la class Medias grâce à l'utilisation de super().
        * @param {number} data.id - l'ID unique du média.
        * @param {string} "assets/medias/" + data.image - Le chemin de l'image correspondant au média.
    */
    constructor(data) {
        super(data)
        this.id = data.id
        this.image = "assets/medias/" + data.image
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média de type image dans le DOM à la suite du HTML de base d'un média.
        * @function [<createMedia>]
        * @override
        * @return {HTMLElement} - Retourne un élément HTML <article> spécifique qui représente le média de type image.
    */
    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
            `
        )

        let imageModal = article.querySelectorAll('.mediaPicture')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une image permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une image permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }


    /**
        * Initialisation de la fonction createMediaModal, permettant de créer un média de type image dans le DOM à l'intérieur d'une div représentant une modale.
        * @function [<createMediaModal>]
        * @return {HTMLElement} - Retourne un élément HTML <div> spécifique qui représente le média de type image dans une modale.
    */
    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
                <img src="${this.image}" class="mediaPicture" alt=""/>
                <p>${this.title}</p> 
            `
        )

        return (article)
    }
}

/**
    * La classe VideoMedia représente la structure d'un média particulier de type vidéo et bénéficie de la structure de base de la class Médias par extension.
    * @class
    * @extends Medias
*/
class VideoMedia extends Medias {

    /** 
        * Utilisation d'un constructor pour la création d'un nouveau média de type video.
        * @constructor
        * @function super - Récupération des datas de la class Medias grâce à l'utilisation de super().
        * @param {number} data.id - l'ID unique du média.
        * @param {string} "assets/medias/" + data.video - Le chemin de la vidéo correspondant au média.
    */
    constructor(data) {
        super(data)
        this.id = data.id
        this.video = "assets/medias/" + data.video
    }

    /**
        * Initialisation de la fonction createMedia, permettant de créer un média de type video dans le DOM à la suite du HTML de base d'un média.
        * @function [<createMedia>]
        * @override
        * @return {HTMLElement} - Retourne un élément HTML <article> spécifique qui représente le média de type video.
    */
    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <video width="350" height="300" alt="${this.title}" class="video" tabindex="0">
            <source src="${this.video}" type=video/mp4>
            </video>
            `
        )

        let imageModal = article.querySelectorAll('.video')
        imageModal.forEach(element => {
            element.addEventListener('click', () => openMediasModal(this.id)) // Ajout d'un évènement au clique d'une vidéo permettant l'ouverture de la modale carroussel.
            element.addEventListener('keydown', (e) => { // Ajout d'un évènement à l'appuie du la touche "entrée" d'une vidéo permettant l'ouverture de la modale carroussel.
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }


    /**
        * Initialisation de la fonction createMediaModal, permettant de créer un média de type video dans le DOM à l'intérieur d'une div représentant une modale.
        * @function [<createMediaModal>]
        * @return {HTMLElement} - Retourne un élément HTML <div> spécifique qui représente le média de type video dans une modale.
    */
    createMediaModal() {
        const article = document.createElement('div')
        article.setAttribute('id', 'mediaModal_' + this.id)
        article.setAttribute('class', 'mediaModal')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <video width="350" height="300" class="video" controls auto>
            <source src="${this.video}" type=video/mp4>
            </video>
            <p>${this.title}</p> 
            `
        )

        return (article)
    }
}