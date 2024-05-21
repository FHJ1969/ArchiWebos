// Appel des API en JSON
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

// Récupération de la galerie et des filtres
let gallery = document.querySelector(".gallery");
let filtresContainer = document.querySelector(".liste-filtres");

// Création des éléments filtres
function generationFiltres() {
    let filtreTous = document.createElement("button");
    filtreTous.classList.add("filtre", "filtre-all", "filtre-selection");
    filtreTous.innerText = "Tous";
    filtreTous.type = "button";
    filtresContainer.appendChild(filtreTous);

    for (let i = 0; i < categories.length; i++) {
        let filtre = document.createElement("button");
        filtre.classList.add("filtre", "filtre-" + categories[i].id);
        filtre.innerText = categories[i].name;
        filtre.type = "button";
        filtresContainer.appendChild(filtre);
    }
}

// Création des éléments galerie
function generationGallery() {
    for (let i = 0; i < works.length; i++) {
        let boite = document.createElement("figure");
        gallery.appendChild(boite);
        boite.classList.add("boite", "boite-" + works[i].categoryId);

        let image = document.createElement("img");
        image.src = works[i].imageUrl;
        boite.appendChild(image);

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].title;
        boite.appendChild(titre);
    }
}

// Appel des fonctions pour l'affichage dynamique des filtres et de la gallery
await generationFiltres();
await generationGallery();

// Récupération des bouttons de filtre
const btnTous = document.querySelector(".filtre-all");
const listeBtn = document.querySelectorAll(".filtre");

//Affichage de la gallery approprié selon le filtre pressé
listeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Supprimer de la classe "filtre-selection" sur tous les bouttons
        listeBtn.forEach((btn) => {
            btn.classList.remove("filtre-selection");
        });

        // Réatributtion de la classe "filtre-selection"
        btn.classList.add("filtre-selection");

        // Masquage de toutes les boites
        const boites = document.querySelectorAll(".boite");
        boites.forEach((boite) => {
            boite.style.display = "none";
        });

        // Affichage des boites correspondant au filtre cliqué
        const boitesFiltre = document.querySelectorAll(".boite-" + btn.classList[1].split("-")[1]);
        boitesFiltre.forEach((boite) => {
            boite.style.display = "block";
        });
    });
});

//Affichage à part pour le filtre "Tous"
btnTous.addEventListener("click", () => {
    // Afficher tous les éléments de la gallery après le click
    const galleryItems = document.querySelectorAll(".gallery figure");
    for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].style.display = "block";
    }

    // Réinitialiser le filtre-selection
    const filtreSelection = document.querySelector(".filtre-selection");
    filtreSelection.classList.remove("filtre-selection");
    btnTous.classList.add("filtre-selection");
});