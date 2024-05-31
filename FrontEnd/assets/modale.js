const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
const btnModifier = document.querySelector('.btn-modifier');
const modal = document.getElementById('modal');
const modaleTitre = document.querySelector('.modal-content h3');
const ajoutPhoto = document.querySelector('.modal-content h4');
const formulaireModale = document.querySelector('.formulaire-modale');
const btnRetour = document.querySelector('.fa-arrow-left');
const fermer = document.querySelector(".fa-xmark");
const modaleHeader = document.querySelector('.modal-header');

function ajoutRetour() {
    if (formulaireModale.style.display === "block"){
        btnRetour.style.display = "block";
        modaleHeader.style.justifyContent = "";
    } else {
        btnRetour.style.display = "none";
        modaleHeader.style.justifyContent ="flex-end";
    }
}
function resetModal() {
    modaleTitre.innerText = "Galerie photo";
    ajoutPhoto.innerText = "Ajouter une photo";
    ajoutPhoto.style.backgroundColor = "";
    ajoutPhoto.style.cursor = "";
    formulaireModale.style.display = "none";
    listeBoites.style.display = "";
    ajoutRetour()
}

btnModifier.addEventListener('click', function() {
    modal.style.display = "block";
    ajoutRetour();
});
// Fermez la modale quand l'icone X est pressé
fermer.addEventListener('click', function() {
    modal.style.display = "none";
    resetModal()
});
// Fermer la modale lorsqu'on clique en dehors de celle-ci
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetModal()
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
            modaleTitre.innerText = "Ajout photo";
            ajoutPhoto.innerText = "Valider";
            ajoutPhoto.style.backgroundColor = "#A7A7A7";
            ajoutPhoto.style.cursor = "not-allowed"
            listeBoites.style.display = "none";
            formulaireModale.style.display = "block";
            ajoutRetour();
        })

        btnRetour.addEventListener('click', (event) => {
            resetModal()
        })
    }
}

galleryModale()