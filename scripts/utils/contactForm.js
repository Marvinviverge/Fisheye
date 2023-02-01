function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";

    const contactForm = `
    <div class="modal">
            <header>
                <h2>Contactez-moi</h2>
                <img src="assets/icons/close.svg" onclick="closeModal()" />
            </header>
            <form onsubmit="submitForm(event)">
                <div>
                <label for="firstName">Prénom</label>
                <input type="text" id="firstName" />
                <label for="lastName">Nom</label>
                <input type="text" id="lastName" />
                <label for="email">Email</label>
                <input type="email" id="email" />
                <label for="message">Votre message</label>
                <textarea id="message"></textarea>
                </div>
                <button class="send_button">Envoyer</button>
            </form>
        </div>
    `

    modal.innerHTML = contactForm;
    return modal
}

function submitForm(event) {
    event.preventDefault();
    const formData = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
    };
    closeModal();
    console.log(formData);
    alert('Votre message a été envoyé avec succès, vous serez recontacté très prochainement.')
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});