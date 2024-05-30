const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
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


