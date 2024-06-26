//Importation des fonctions
import { generationGallery } from './script.js';
import { resetModal } from './script.js';

//Définition des élements du DOM récurrents
const modal = document.getElementById('modal');
const btnValider = document.querySelector('.modal-content h4');
const formValider = document.getElementById('ajout-photo-modale');
const inputTitre = document.getElementById('titre')
const inputCategorie = document.getElementById('categorie');
const inputPhoto = document.getElementById('photo-input')
const userConnected = JSON.parse(localStorage.getItem('userConnected'));
const listeBoites = document.querySelector('.modale-liste-boites');
let inputCategoryId = inputCategorie.value;

if (userConnected) {
//Ajouts des options pour les catégories du formulaire
    const options = {};
    async function ajoutOptionsFormulaire() {
        const reponseCategories = await fetch("http://localhost:5678/api/categories");
        const categories = await reponseCategories.json();
        const placeholderOptions = '<option value="" disabled selected></option>';
        inputCategorie.innerHTML = placeholderOptions;

        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement("option");
            option.setAttribute("value", categories[i].id);
            option.innerText = categories[i].name;
            options[categories[i].id] = option;
            inputCategorie.appendChild(option);
        }
    }
//Changement de couleur et de curseur pour le bouton valider selon le status des éléments du formulaire de la modale
    function couleurBtnValider() {
        if (inputTitre.value != null && inputCategoryId != null && inputPhoto.files[0] != null) {
            formValider.style.backgroundColor = "#1d6154";
            formValider.style.cursor = "pointer";
        } else {
            formValider.style.backgroundColor = "";
            formValider.style.cursor = "";
        }
    }

//Changement de status selon le bouton pressé
    document.querySelector('.btn-modifier').addEventListener('click', function() {
        modal.style.display = "block";
    });
    document.querySelector('.fermer-modal').addEventListener('click', function() {
        modal.style.display = "none";
        resetModal()
    });
    document.querySelector('.fermer-form').addEventListener('click', function() {
        modal.style.display = "none";
        resetModal()
    });
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetModal()
        }
    });
    document.querySelector('.fa-arrow-left').addEventListener('click', function(event) {
        resetModal()
    });

//Génération de la modale et ses changements de status
    async function galleryModale() {
        const responseWork = await fetch("http://localhost:5678/api/works");
        const works = await responseWork.json();
        for (let i = 0; i < works.length; i++) {
            const boiteModale = document.createElement("figure");
            boiteModale.classList.add("boite-modale");
            listeBoites.appendChild(boiteModale);
            boiteModale.dataset.categoryId = works[i].categoryId;
            boiteModale.dataset.id = works[i].id;

            const image = document.createElement("img");
            image.src = works[i].imageUrl;
            boiteModale.appendChild(image);

            const iconeSupprimer = document.createElement("i");
            iconeSupprimer.className = "fa-solid fa-trash-can";
            iconeSupprimer.classList.add("icone-supprimer");
            boiteModale.appendChild(iconeSupprimer);

            // Suppression des work selon le bouton supprimer pressé
            iconeSupprimer.addEventListener('click', (event) => {
                const token = JSON.parse(localStorage.getItem('userConnected')).token;
                const workId = boiteModale.dataset.id;
                // Vérifiez si l'utilisateur est connecté en utilisant la clé "Userconnected" dans le local storage
                if (userConnected) {
                    fetch(`http://localhost:5678/api/works/${workId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log("Suppression réussie.");
                                listeBoites.innerHTML = "";
                                generationGallery();
                                galleryModale()
                            } else {
                                console.error('Erreur dans la suppression:', response);
                            }
                        })
                        .catch(error => {
                            console.error('Erreur dans la suppression:', error);
                        });
                }
            });
        }
    }
    btnValider.addEventListener('click', (event) => {
        document.getElementById('step1').style.display = "none";
        document.querySelector('.formulaire-modale').style.display = "block";
        ajoutOptionsFormulaire();
    })

// Changement des élements de la modale après que le bouton "Ajouter une photo soit pressé"
    formValider.addEventListener('click', async (event) => {
        const formulaireModale = document.querySelector('.formulaire-modale');
        const token = JSON.parse(localStorage.getItem('userConnected')).token;
        event.preventDefault();
        document.querySelector('.modal-content h3').innerText = "Ajout photo";
        btnValider.innerText = "Valider";
        btnValider.style.backgroundColor = "#A7A7A7";
        btnValider.style.cursor = "not-allowed";
        listeBoites.style.display = "none";
        formulaireModale.style.display = "block";

        const inputCategorie = document.getElementById('categorie');
        let inputCategoryId = inputCategorie.value;
        // Créer un objet FormData à partir des valeurs des champs du formulaire
        if (inputPhoto.value && inputTitre.value && inputCategoryId) {
            const formData = new FormData();
            formData.append("image", inputPhoto.files[0]);
            formData.append("title", inputTitre.value);
            formData.append("category", inputCategoryId);

            // Stocker les éléments fournis dans le formulaire dans le chemin "work" de l'API
            try {
                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
                if (response.ok) {
                    console.log("La boîte a été créée avec succès");
                    modal.style.display = "none";
                    listeBoites.innerHTML = "";
                    generationGallery();
                    galleryModale();
                    resetModal()
                } else {
                    console.error("Erreur dans la création de la boîte");
                    modal.style.display = "none";
                    resetModal()
                }
            } catch (error) {
                console.error("Erreur dans la création de la boîte", error);
            }
        }
    });

//Changement du style du bouton après que les champs du formulaire soient remplis
    const inputFormulaire = [inputTitre,inputCategorie,inputPhoto];
    inputFormulaire.forEach((input) => {
        input.addEventListener("input", (event) => {
            couleurBtnValider()
        });
    });

//Ajout de la photo sélectionnée comme placeholder
    inputPhoto.addEventListener("change", function (event) {
        const photoUpload = document.querySelector('.photo-upload');
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-img");
            photoUpload.innerHTML = "";
            photoUpload.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
    galleryModale();
}