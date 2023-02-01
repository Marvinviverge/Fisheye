function initMediasModal(medias) {

    const modal = document.getElementById("medias_modal");
    modal.style.display = "none";

    const modalHtml = `
    <div class="modal_childrens">
        <div class="modal-content">
            <div id="left-side">
                <span class="previous-button"></span>
            </div>
            <div id="carousel"></div>
            <div id="right-side">
                <span class="close-button"></span>
                <span class="next-button"></span>
            </div>
        </div>
    </div>
    `

    modal.innerHTML = modalHtml;

    let closeButton = document.querySelector('.close-button');
    let previousButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    let carousel = document.getElementById("carousel");

    // Création des médias
    for (let i = 0; i < medias.length; i++) {
        if (medias[i].image) {
            let imageMedia = new ImageMedia(medias[i])
            let article = imageMedia.createMediaModal();

            carousel.appendChild(article);

        } else {
            let videoMedia = new VideoMedia(medias[i])
            let article = videoMedia.createMediaModal();

            carousel.appendChild(article);
        }
    }

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    previousButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.previousElementSibling) {
            m.previousElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:last-child').classList.add('active')
        }
    });

    nextButton.addEventListener("click", function () {
        let m = modal.querySelector('.mediaModal.active')
        m.classList.remove('active')

        if (m.nextElementSibling) {
            m.nextElementSibling.classList.add('active')
        } else {
            modal.querySelector('.mediaModal:first-child').classList.add('active')
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            previousButton.click();
        } else if (e.key === "ArrowRight") {
            nextButton.click();
        } else if (e.key === "Escape") {
            closeButton.click();
        }
    });

    return modal;
}

function openMediasModal(id) {

    const modal = document.getElementById("medias_modal");
    const img = document.getElementById('mediaModal_' + id);

    modal.style.display = 'block'
    modal.querySelectorAll('.mediaModal').forEach(m => {
        m.classList.remove('active')
    })
    img.classList.add('active')
}