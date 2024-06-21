const loginElement = document.querySelector('.login');
const modifierHeader = document.querySelector('.modifier-header');
displayAdmin()

function changementsAdmin () {
    const mesProjets = document.querySelector('#portfolio h2');

    document.querySelector('header').style.marginTop = "100px";
    loginElement.innerText = "logout";
    loginElement.href = "index.html";
    document.querySelector('.liste-filtres').style.display = "none";
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

function displayAdmin(){
    if (localStorage.getItem('userConnected')) {
        changementsAdmin()
    } else {
        //Affichage normal si non connecté
        document.querySelector('header').style.marginTop = "50px";
        loginElement.innerText = "login"
        loginElement.href = "index-login.html";
        modifierHeader.style.display = "none";
    }
}

//Suppression de 'userConnected' si lien logout pressé
loginElement.addEventListener('click', (event) => {
    if (localStorage.getItem('userConnected')) {
        localStorage.removeItem('userConnected');
    }
})