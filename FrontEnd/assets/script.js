// Appel des API en JSON
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

// Récupération de la galerie et des filtres
await generationFiltres();
await generationGallery();

// Création des éléments filtres
function generationFiltres() {
    const filtresContainer = document.querySelector(".liste-filtres");
    if (localStorage.getItem('userConnected') === null) {
        let filtreTous = document.createElement("button");
        filtreTous.classList.add("filtre", "filtre-all", "filtre-selection");
        filtreTous.dataset.categoryId = "";
        filtreTous.innerText = "Tous";
        filtreTous.type = "button";
        filtreTous.addEventListener("click", filterProject )
        filtresContainer.appendChild(filtreTous);

        for (let i = 0; i < categories.length; i++) {
            let filtre = document.createElement("button");
            filtre.classList.add("filtre");
            filtre.innerText = categories[i].name;
            filtre.type = "button";
            filtre.dataset.categoryId = categories[i].id;
            filtre.addEventListener("click", filterProject )
            filtresContainer.appendChild(filtre);
        }
    }
}

// Création des éléments galerie
export async function generationGallery() {
    const responseWork = await fetch("http://localhost:5678/api/works");
    const works = await responseWork.json();

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        let boite = document.createElement("figure");
        gallery.appendChild(boite);
        //boite.classList.add("boite", "boite-" + works[i].categoryId);
        boite.dataset.categoryId = works[i].categoryId
        let image = document.createElement("img");
        image.src = works[i].imageUrl;
        boite.appendChild(image);

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].title;
        boite.appendChild(titre);
    }
}

//Affichage de la gallery approprié selon le filtre pressé
function filterProject (event) {
        let categoryTargetId = event.target.dataset.categoryId;
        const boites = document.querySelectorAll(".gallery figure");
        document.querySelectorAll(".liste-filtres button").forEach(element => {
            element.classList.remove("filtre-selection")
        })
        event.target.classList.add("filtre-selection");
        boites.forEach(boite => {
            if (boite.dataset.categoryId == categoryTargetId || categoryTargetId == "" ) {
                boite.style.display = "block";
            } else {
                boite.style.display = "none";
            }
        })
}

export function resetModal() {
    const photoUpload = document.querySelector('.photo-upload');
    photoUpload.innerHTML = "";
    const contenuPhotoUpload = `<i class="fa-regular fa-image"></i>
    <label class="label-photo" for="photo-input">+ Ajouter photo</label>
    <input type="file" id="photo-input" name="filename" accept="image/gif, image/jpeg, image/png" hidden>
    <p class="photo-format">jpg, png de 4mo max</p>`;
    photoUpload.innerHTML = contenuPhotoUpload

    const inputPhoto = document.getElementById("photo-input");
    inputPhoto.addEventListener("change", function (event) {
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

    const formValider = document.getElementById('ajout-photo-modale');
    formValider.style.backgroundColor = ""
    formValider.style.cursor = "";
    document.querySelector('.formulaire-modale').style.display = "none";
    const btnValider = document.querySelector('.modal-content h4');
    btnValider.innerText = "Ajouter une photo";
    btnValider.style.backgroundColor = "#1D6154";
    btnValider.style.cursor = "pointer";
    document.querySelector('.modale-liste-boites').style.display = "";
    document.getElementById('titre').value = "";
    document.getElementById('categorie').innerHTML = "";
    document.getElementById('step1').style.display = "block";
}