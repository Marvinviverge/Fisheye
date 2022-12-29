function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <a href="./photographer.html?id=${data.id}">
                    <img src="${picture}" alt="">
                    <h2>${data.name}</h2>
                </a>        
                <h3>${data.city}, ${data.country}</h3>
                <p class="tagline">${data.tagline}</p>
                <p class="price">${data.price}€/jour</p>
            `
        );

        return (article);
    }

    return { name, picture, getUserCardDOM }
}