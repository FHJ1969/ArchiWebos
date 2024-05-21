// Appel des API en JSON
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

// Récupération de la galerie et du conteneur des filtres du HTML
let gallery = document.querySelector(".gallery");
let filtresContainer = document.querySelector(".liste-filtres");

// Création des éléments filtres
function generationFiltres() {
    // Création du filtre "Tous"
    let filtreTous = document.createElement("button");
    filtreTous.classList.add("filtre", "filtre-all", "filtre-selection");
    filtreTous.innerText = "Tous";
    filtreTous.type = "button";
    filtresContainer.appendChild(filtreTous);

    // Création des filtres pour chaque catégorie
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

// Appel des fonctions
await generationFiltres();
await generationGallery();

// Récupération des boutons de filtre
const btnTous = document.querySelector(".filtre-all");
const listeBtn = document.querySelectorAll(".filtre");

// Ajout d'un écouteur d'événement sur chaque bouton de filtre
listeBtn.forEach((btn) => {
    btnTous.addEventListener("click", ()=>{
        filtresContainer.innerHTML = "";
        generationFiltres()
        gallery.innerHTML = "";
        generationGallery();
    });
    btn.addEventListener("click", () => {
        // Suppression de la classe "filtre-selection" sur tous les boutons
        listeBtn.forEach((btn) => {
            btn.classList.remove("filtre-selection");
        });

        // Ajout de la classe "filtre-selection" sur le bouton cliqué
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

        // Si le bouton "Tous" est cliqué, affichage de toutes les boites
        if (btn.classList[1] === "all") {
            boites.forEach((boite) => {
                boite.style.display = "block";
            });
        }
    });
});