//Appel des API en JSON

const reponseWorks = await fetch("http://localhost:5678/api/works")
const works = await reponseWorks.json()

const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json()
console.log(categories)


//Récupération de la .gallery et du .filtres du html
let gallery = document.querySelector (".gallery");
let filtres = document.querySelector (".liste-filtres");



//Création des élements Filtres
function generationFiltres(){
    let filtre =  document.createElement("button");
    filtre.classList.add("filtre","filtre-selection")
    filtre.innerText = "Tous";
    filtre.type = "button";
    filtres.appendChild(filtre);
    for (let i=0; i < categories.length; i++){
        let filtre =  document.createElement("button");
        filtre.classList.add("filtre")
        filtre.innerText = categories[i].name;
        filtre.type = "button";
        filtres.appendChild(filtre);
    }
}


//Création des élements Gallery
function generationGallery() {
    for (let i = 0; i < works.length; i++) {
        let boite = document.createElement("figure");
        gallery.appendChild(boite)

        let image = document.createElement("img")
        image.src = works[i].imageUrl;
        boite.appendChild(image)

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].title;
        boite.appendChild(titre);
    }
}


//Appel des fonctions
generationFiltres();
generationGallery();


