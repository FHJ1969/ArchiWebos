//Modification des éléments selon la présence ou non de 'userConnected' en localStorage
const loginElement = document.querySelector('.login');
const listeFiltres = document.querySelector('.liste-filtres');

if (localStorage.getItem('userConnected')){
    loginElement.innerText = "logout"
    loginElement.href = "index.html";
    listeFiltres.style.display = "none";
} else {
    loginElement.innerText = "login"
    loginElement.href = "index-login.html";
}

//Suppression de 'userConnected' si lien logout pressé
loginElement.addEventListener('click', (event) => {
    if (localStorage.getItem('userConnected')) {
        localStorage.removeItem('userConnected');
    }
})