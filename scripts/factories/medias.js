function mediasFactory(data, name) {
    const { date, id, image, video, likes, photographerId, price, title } = data;

    let picture = `assets/medias/${image}`

    /* Création d'une fonction permettant de créer le DOM et afficher un média*/
    function getMedia() {

        /* Le média est contenu dans un article*/
        const article = document.createElement('article');

        /* Si le média contient une image*/
        if (image) {
            article.insertAdjacentHTML(
                "beforeend",
                `
                    <img src="${picture}" class ="mediaPicture" alt="">
                    <div class ="descriptionPicture">
                        <p>${title}</p>
                        <p>${likes}</p>
                    </div>  
                `
            )
        } else { /*Si le média contient une video*/
            picture = `assets/medias/${video}`
            article.insertAdjacentHTML(
                "beforeend",
                `
                    <video width="350" height="300" controls autoplay>
                        <source src="${picture}" type=video/mp4>
                    </video>
                    <div class ="descriptionPicture">
                        <p>${title}</p>
                        <p>${likes}</p>
                    </div>   
                `
            )
        }

        return (article);
    }

    return { picture, getMedia }
}