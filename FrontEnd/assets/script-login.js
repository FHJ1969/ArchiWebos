const form = document.querySelector('#contact form');
const emailInput = document.querySelector('#email');
const mdpInput = document.querySelector('#mdp');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const mdp = mdpInput.value;
    if (email === 'sophie.bluel@test.tld' && mdp === 'S0phie') {
        window.location.href = 'index-admin.html';
    } else {
        alert('Erreur dans l’identifiant ou le mot de passe');
    }
});

//Communiquer l'identifiant et le mot de passe à l'API
const reponseUsers = await fetch("http://localhost:5678/api/users/login")
const Users = await reponseUsers.json();
console.log(Users);





