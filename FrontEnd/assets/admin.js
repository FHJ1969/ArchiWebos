//Modification des éléments selon la présence ou non de 'userConnected' en localStorage
const loginElement = document.querySelector('.login');
const listeFiltres = document.querySelector('.liste-filtres');

if (localStorage.getItem('userConnected')) {
//Eléments modifié avec le passage en page admin
    loginElement.innerText = "logout"
    loginElement.href = "index.html";
    listeFiltres.style.display = "none";
//Création du bouton de la modale "modifier"
    const mesProjets = document.querySelector('#portfolio h2');

    const modifierIcone = document.createElement("i");
    modifierIcone.className = "fa-regular fa-pen-to-square";
    modifierIcone.classList.add("modifier");
    mesProjets.appendChild(modifierIcone);

    const modifier = document.createElement("button");
    modifier.innerText = "modifier";
    mesProjets.appendChild(modifier);
    modifier.classList.add('btn-modifier','modifier')

} else {
//Affichage normal si non connecté
    loginElement.innerText = "login"
    loginElement.href = "index-login.html";
}

//Suppression de 'userConnected' si lien logout pressé
loginElement.addEventListener('click', (event) => {
    if (localStorage.getItem('userConnected')) {
        localStorage.removeItem('userConnected');
    }
})

// Sélectionnez le bouton modifier et la boîte de dialogue modale
const btnModifier = document.querySelector('.btn-modifier');
const modal = document.getElementById('modal');

// Ajoutez un événement clic au bouton modifier
btnModifier.addEventListener('click', function() {
    // Ouvrez la boîte de dialogue modale
    modal.style.display = "block";
});

// Sélectionnez le bouton de fermeture et ajoutez un événement clic
const span = document.querySelector(".fa-xmark");
span.addEventListener('click', function() {
    // Fermez la boîte de dialogue modale
    modal.style.display = "none";
});

// Fermez la boîte de dialogue modale lorsque l'utilisateur clique en dehors de celle-ci
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

