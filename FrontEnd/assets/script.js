// Appel des API en JSON
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

// Récupération de la galerie et des filtres
let gallery = document.querySelector(".gallery");
let filtresContainer = document.querySelector(".liste-filtres");

await generationFiltres();
await generationGallery();

// Création des éléments filtres
export function generationFiltres() {
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

// Création des éléments galerie
export function generationGallery() {
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