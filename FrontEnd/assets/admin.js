const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
const loginElement = document.querySelector('.login');
const listeFiltres = document.querySelector('.liste-filtres');
const modifierHeader = document.querySelector('.modifier-header');

function changementsAdmin () {
    const mesProjets = document.querySelector('#portfolio h2');

    loginElement.innerText = "logout"
    loginElement.href = "index.html";
    listeFiltres.style.display = "none";
    mesProjets.style.marginLeft = "3.5em";

    //Bouton modifier pour ouvrir la modale à côté du titre
    const modifierIcone = document.createElement("i");
    modifierIcone.className = "fa-regular fa-pen-to-square";
    modifierIcone.classList.add("modifier");

    const modifierTexte = document.createElement("button");
    modifierTexte.innerText = "modifier";
    modifierTexte.classList.add('btn-modifier','modifier');

    mesProjets.appendChild(modifierIcone);
    mesProjets.appendChild(modifierTexte);

    //Bouton modifier pour ouvrir la modale en haut de page
    const modifierIconeHeader = document.createElement("i");
    modifierIconeHeader.className = "fa-regular fa-pen-to-square";
    modifierIconeHeader.classList.add("btn-modifier-header","icone-header");

    const modifierTexteHeader = document.createElement("button");
    modifierTexteHeader.innerText = "Mode édition";
    modifierTexteHeader.classList.add('btn-modifier-header','modifier-texte-header');

    modifierHeader.appendChild(modifierIconeHeader);
    modifierHeader.appendChild(modifierTexteHeader);
}


if (localStorage.getItem('userConnected')) {
//Eléments modifié avec le passage en page admin
    changementsAdmin()
} else {
//Affichage normal si non connecté
    loginElement.innerText = "login"
    loginElement.href = "index-login.html";
    modifierHeader.style.display = "none";
}

//Suppression de 'userConnected' si lien logout pressé
loginElement.addEventListener('click', (event) => {
    if (localStorage.getItem('userConnected')) {
        localStorage.removeItem('userConnected');
    }
})


