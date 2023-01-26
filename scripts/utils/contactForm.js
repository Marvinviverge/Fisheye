function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const contactForm = `
    <div class="modal">
            <header>
                <h2>Contactez-moi</h2>
                <img src="assets/icons/close.svg" onclick="closeModal()" />
            </header>
            <form>
                <div>
                    <label>Prénom</label>
                    <input />
                    <label>Nom</label>
                    <input />
                    <label>Email</label>
                    <input />
                    <label>Votre message</label>
                    <input />
                </div>
                <button class="send_button">Envoyer</button>
            </form>
        </div>
    `

    modal.innerHTML = contactForm;
    return modal
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}