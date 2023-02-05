/* ---- Ce fichier comporte les éléments nécessaire à l'affichage de la modale de formulaire de contact, ainsi qu'à son traitement. ---- */

/**
 * Initialisation de la fonction displayModal, permettant l'affichage d'un formulaire de contact à un photographe dans une modale.
 * @function [<displayModal>]
 * @returns {HTMLElement} - Retourne un élément HTML qui représente la modale de formulaire de contact à un photographe. 
 */
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

/**
 * Initialisation de la fonction submitForm qui permet le console.log des informations saisies dans le formulaire par un utilisateur.
 * @function [<submitForm>]
 * @param {Object} event - Objet contenant les informations saisies par l'utilisateur
 */
function submitForm(event) {
    event.preventDefault();
    const formData = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
    };
    closeModal(); //Appel de la fonction closeModal
    console.log(formData);
    alert('Votre message a été envoyé avec succès, vous serez recontacté très prochainement.')
}

/**
 * Initialisation de la fonction closeModal, permettant la fermeture de la modale de formulaire de contact.
 * @function [<closeModal>]
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Ajout d'un évènement à l'appui sur la touche 'échap' permettant la fermeture de la modale de formulaire de contact lorsque celle-ci est ouverture.
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});