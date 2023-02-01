class Medias {
    constructor(data) {
        const { date, id, likes, photographerId, price, title } = data;
        this.title = title;
        this.likes = likes;
        this.id = id;
    }

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
        likeHeart.addEventListener('click', function incLike(e) {

            likeHeart.classList.add('heartliked');
            let likeValue = parseInt(e.target.parentElement.textContent)
            let intValue = e.target.parentElement.querySelector('p')
            let totalLikes = document.getElementById("totalLikes")

            intValue.innerHTML = likeValue + 1;
            totalLikes.innerHTML = parseInt(totalLikes.textContent) + 1;

            likeHeart.removeEventListener('click', incLike)
        })
        likeHeart.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                likeHeart.click();
            }
        })

        return (article);
    }
}

class ImageMedia extends Medias {
    constructor(data) {
        super(data)
        this.id = data.id
        this.image = "assets/medias/" + data.image
    }
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
            element.addEventListener('click', () => openMediasModal(this.id))
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }

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
class VideoMedia extends Medias {
    constructor(data) {
        super(data)
        this.id = data.id
        this.video = "assets/medias/" + data.video
    }

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
            element.addEventListener('click', () => openMediasModal(this.id))
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    openMediasModal(this.id)
                }
            })
        })

        return (article);
    }

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