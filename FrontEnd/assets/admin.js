const loginElement = document.querySelector('.login');

//Modification des éléments selon la présence ou non de 'userConnected' en localStorage
function adminIndex() {
    if (localStorage.getItem('userConnected')){
        loginElement.innerText = "logout"
        loginElement.href = "index.html";
    } else {
        loginElement.innerText = "login"
        loginElement.href = "index-login.html";
    }
}
//Suppression de 'userConnected' si lien logout pressé
loginElement.addEventListener('click', (event) => {
    if (localStorage.getItem('userConnected')) {
        localStorage.removeItem('userConnected');
    }
})
adminIndex()