const reponseWork = await fetch("http://localhost:5678/api/works");
const work = await reponseWork.json();
//Définition des élements du DOM
const btnModifier = document.querySelector('.btn-modifier');
const modal = document.getElementById('modal');
const modaleTitre = document.querySelector('.modal-content h3');
const btnValider = document.querySelector('.modal-content h4');
const formulaireModale = document.querySelector('.formulaire-modale');
const btnRetour = document.querySelector('.fa-arrow-left');
const fermer = document.querySelector(".fa-xmark");
const modaleHeader = document.querySelector('.modal-header');
const inputTitre = document.getElementById('titre')
const inputPhoto = document.querySelector('#photo-input');
const inputCategorie = document.getElementById('categorie');
const inputFormulaire = [inputTitre, inputPhoto, inputCategorie];
const photoUpload = document.querySelector('.photo-upload');
let gallery = document.querySelector(".gallery");

const token =JSON.parse(localStorage.getItem('userConnected')).token;
const userConnected = JSON.parse(localStorage.getItem('userConnected'));
const userId = userConnected.userId;

const categorieChoix0 = document.getElementById('choix0')
const categorieChoix1 = document.getElementById('choix1')
const categorieChoix2 = document.getElementById('choix2')
let inputCategoryId = 0

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
    btnValider.innerText = "Ajouter une photo";
    btnValider.style.backgroundColor = "";
    btnValider.style.cursor = "";
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
async function galleryModale() {
    const reponseWork = await fetch("http://localhost:5678/api/works");
    const work = await reponseWork.json();
    for (let i = 0; i < work.length; i++) {
        const boiteModale = document.createElement("figure");
        boiteModale.classList.add("boite-modale");
        listeBoites.appendChild(boiteModale);
        boiteModale.dataset.categoryId = work[i].categoryId;
        boiteModale.dataset.id = work[i].id; // Ajoutez l'ID du projet à l'élément figure

        const image = document.createElement("img");
        image.src = work[i].imageUrl;
        boiteModale.appendChild(image);

        const iconeSupprimer = document.createElement("i");
        iconeSupprimer.className = "fa-solid fa-trash-can";
        boiteModale.appendChild(iconeSupprimer);

        // Suppression des work selon le bouton supprimer pressé
        iconeSupprimer.addEventListener('click', (event) => {
            const workId = boiteModale.dataset.id;
            // Vérifiez si l'utilisateur est connecté en utilisant la clé "Userconnected" dans le local storage
            if (token) {
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization':'Bearer ' + token
                    }
                })
                    .then(response => {
                        console.log(response)
                        if (response.ok) {
                            modal.style.display = "none";
                            generationGallery()
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

    // Changement des élements de la modale après que le bouton "Ajouter une photo soit pressé"
    btnValider.addEventListener('click', async (event) => {
        modaleTitre.innerText = "Ajout photo";
        btnValider.innerText = "Valider";
        btnValider.style.backgroundColor = "#A7A7A7";
        btnValider.style.cursor = "not-allowed"
        listeBoites.style.display = "none";
        formulaireModale.style.display = "block";
        ajoutRetour();

        // Vérifier que tous les champs du formulaire sont remplis
        if (inputPhoto.value !== "" && inputTitre.value !== "" && inputCategorie.value !== "") {
            // Attribuer l'ID de catégorie en fonction de la valeur du champ de catégorie
            for (let i=0; i<3; i++){
                if (inputCategorie.value === categorieChoix[i].value){
                    inputCategorie = [i];
                }
            }

            // Créer un objet JSON à partir des valeurs des champs du formulaire
            const formulaireData = {
                id: "",
                title: inputTitre.value,
                imageUrl: inputPhoto.value,
                categoryId: inputCategoryId,
                userId: userId
            };

            const formulaireJSON = JSON.stringify(formulaireData);

            //Stocker les éléments fourni dans le formulaire dans le chemin "work" de l'API
            await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: formulaireJSON,
            })
                .then(response => {
                    if (response.ok) {
                        console.log('La boîte a été créée avec succès');
                        modal.style.display = "none";
                    } else {
                        console.error('Erreur dans la création de la boîte');
                        for (let i=0; i<inputFormulaire.length; i++) {
                            inputFormulaire[i].value = "" ;
                        }
                    }
                })
                .catch(error => {
                    console.error('Erreur dans la création de la boîte', error);
                });

        };


    //Changement du style du bouton après que les champs du formulaire soit rempli
    inputFormulaire.forEach((input) => {
        input.addEventListener('input', (event) => {
            if (inputPhoto.value !== "" && inputTitre.value !== "" && inputCategorie.value !== "") {
                btnValider.style.backgroundColor = "#1d6154";
                btnValider.style.cursor = "pointer"
            } else {
                btnValider.style.backgroundColor = "#A7A7A7";
                btnValider.style.cursor = "not-allowed"
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

    })
}

galleryModale()
async function generationGallery() {
    const reponseWork = await fetch("http://localhost:5678/api/works");
    const works = await reponseWork.json();
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        let boite = document.createElement("figure");
        //boite.classList.add("boite", "boite-" + works[i].categoryId);
        boite.dataset.categoryId = works[i].categoryId
        let image = document.createElement("img");
        image.src = works[i].imageUrl;
        boite.appendChild(image);

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].title;
        boite.appendChild(titre);
        gallery.appendChild(boite);
    }
}