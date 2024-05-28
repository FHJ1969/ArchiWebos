const form = document.querySelector('#contact form');
const emailInput = document.querySelector('#email');
const mdpInput = document.querySelector('#mdp');
const loginElement = document.querySelector('.login');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const mdp = mdpInput.value;

    // Création d'un objet avec les valeurs de l'email et du mot de passe
    const userData = {
        email: email,
        password: mdp
    };

    // Convertir l'objet en JSON
    const jsonData = JSON.stringify(userData);

    // Requête à l'API
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            // Vérifier si la réponse de l'API indique une connexion réussie
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur dans l’identifiant ou le mot de passe');
            }
        })

        .then(data => {
            // Rediriger vers la page index si la connexion est réussie
            localStorage.setItem('userConnected', JSON.stringify(data));
            window.location.href = 'index.html';

        })

        .catch(error => {
            // Afficher un message d'erreur si la connexion échoue
            alert(error.message);
        })
});