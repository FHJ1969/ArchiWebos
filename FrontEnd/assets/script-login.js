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
        alert('E-mail ou mot de passe incorrect');
    }
});