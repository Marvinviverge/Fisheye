function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <a href="./photographer.html?id=${id}">
                    <img src="${picture}" alt="">
                    <h2>${name}</h2>
                </a>        
                <h3>${city}, ${country}</h3>
                <p class="tagline">${tagline}</p>
                <p class="price">${price}€/jour</p>
            `
        );

        return (article);
    }

    function getUser() {
        const photographerCard = document.createElement('section');

        photographerCard.classList.add("photographerCard")
        photographerCard.insertAdjacentHTML(
            "beforeend",
            `
                <div class = "informations">
                    <h1>${name}</h1>
                    <h3>${city}, ${country}</h3>
                    <p class="tagline">${tagline}</p>
                </div>  
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                <img src="${picture}" alt="" class="userPicture">
                <div class="dayPrice">
                <div class="likes"><p id="totalLikes">X</p><img class="heart2" src="assets/icons/Heart2.png"/></div>
                <p>${price}€/jour</p>
                </div>
            `
        )

        return (photographerCard)
    }

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