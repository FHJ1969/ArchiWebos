const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
//Définition des élements du DOM
const btnModifier = document.querySelector('.btn-modifier');
const modal = document.getElementById('modal');
const modaleTitre = document.querySelector('.modal-content h3');
const ajoutPhoto = document.querySelector('.modal-content h4');
const formulaireModale = document.querySelector('.formulaire-modale');
const btnRetour = document.querySelector('.fa-arrow-left');
const fermer = document.querySelector(".fa-xmark");
const modaleHeader = document.querySelector('.modal-header');
const inputTitre = document.getElementById('titre')
const inputPhoto = document.querySelector('#photo-input');
const inputCateogorie = document.getElementById('categorie');
const photoUpload = document.querySelector('.photo-upload');

//Functions à utiliser plusieurs fois durant le code
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
//Changement de status selon le bouton pressé
btnModifier.addEventListener('click', function() {
    modal.style.display = "block";
    ajoutRetour();
});

fermer.addEventListener('click', function() {
    modal.style.display = "none";
    resetModal()
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetModal()
    }
});
btnRetour.addEventListener('click', resetModal)

//Génération de la modale et ses changements de status
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
    }

    // Changement des élements de la modale après que le bouton "Ajouter une photo soit pressé"
    ajoutPhoto.addEventListener('click', (event) => {
        modaleTitre.innerText = "Ajout photo";
        ajoutPhoto.innerText = "Valider";
        ajoutPhoto.style.backgroundColor = "#A7A7A7";
        ajoutPhoto.style.cursor = "not-allowed"
        listeBoites.style.display = "none";
        formulaireModale.style.display = "block";
        ajoutRetour();
    });

    const inputFormulaire = [inputTitre, inputPhoto, inputCateogorie];
    inputFormulaire.forEach((input) => {
        input.addEventListener('input', (event) => {
            if (inputPhoto.value !== "" && inputTitre.value !== "" && inputCateogorie.value !== "") {
                ajoutPhoto.style.backgroundColor = "#1d6154";
                ajoutPhoto.style.cursor = "pointer"
            } else {
                ajoutPhoto.style.backgroundColor = "#A7A7A7";
                ajoutPhoto.style.cursor = "not-allowed"
            }
        });
    });

    //Ajout de la photo sélectionné comme placeholder
    inputPhoto.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('preview-img');
            photoUpload.innerHTML = '';
            photoUpload.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
}
galleryModale()