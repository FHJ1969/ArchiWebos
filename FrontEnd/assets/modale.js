const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
const loginElement = document.querySelector('.login');
const listeFiltres = document.querySelector('.liste-filtres');
const btnModifier = document.querySelector('.btn-modifier');
const modal = document.getElementById('modal');
const modaleTitre = document.querySelector('.modal-content h3');
const ajoutPhoto = document.querySelector('.modal-content h4');
const formulaireModale = document.querySelector('.formulaire-modale');

btnModifier.addEventListener('click', function() {
    // Ouvrez la boîte de dialogue modale
    modal.style.display = "block";
});

const span = document.querySelector(".fa-xmark");
span.addEventListener('click', function() {
    // Fermez la boîte de dialogue modale
    modal.style.display = "none";
    // Réinitialisez le contenu d'origine
    modaleTitre.innerText = "Galerie photo";
    ajoutPhoto.innerText = "Ajouter une photo";
});

// Fermer la modale lorsqu'on clique en dehors de celle-ci
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // Réinitialisez le contenu d'origine
        modaleTitre.innerText = "Galerie photo";
        ajoutPhoto.innerText = "Ajouter une photo";
    }
});

//Génération de la modale
const listeBoites = document.querySelector('.modale-liste-boites');
function galleryModale() {
    for (let i = 0; i < work.length; i++) {
        const boiteModale = document.createElement("figure");
        boiteModale.classList.add("boite-modale");
        listeBoites.appendChild(boiteModale);
        boiteModale.dataset.categoryId = work[i].categoryId;

        const image = document.createElement("img");
        image.src = work[i].imageUrl;
        boiteModale.appendChild(image);

        const iconeSupprimer = document.createElement("i");
        iconeSupprimer.className = "fa-solid fa-trash-can";
        boiteModale.appendChild(iconeSupprimer);

        //Suppression des work selon le bouton supprimer pressé
        iconeSupprimer.addEventListener('click', (event) => {
            const workId = boiteModale.dataset.id;

            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        boiteModale.remove();
                    } else {
                        console.error('Erreur dans la suppression:', response);
                    }
                })
                .catch(error => {
                    console.error('Erreur dans la suppression:', error);
                });
        });
        //Changement des élements de la modale après que le bouton "Ajouter une photo soit pressé"
        ajoutPhoto.addEventListener('click', (event) => {
            event.preventDefault();
            modaleTitre.innerText = "Ajout photo";
            ajoutPhoto.innerText = "Valider";
            listeBoites.style.display = "none";
            formulaireModale.style.display = "block";
        })
    }
}

galleryModale()