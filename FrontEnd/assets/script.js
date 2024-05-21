//Appel des API en JSON

const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
console.log(works);

const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();


//Récupération de la .gallery et du .filtres du html
let gallery = document.querySelector (".gallery");
let filtres = document.querySelector (".liste-filtres");



//Création des élements Filtres
function generationFiltres(){
    let filtre =  document.createElement("button");
    filtre.classList.add("filtre","filtre-all","filtre-selection")
    filtre.innerText = "Tous";
    filtre.type = "button";
    filtres.appendChild(filtre);
    for (let i=0; i < categories.length; i++){
        let filtre =  document.createElement("button");
        filtre.classList.add("filtre","filtre-" + categories[i].id);
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
        console.log(boite)

        let image = document.createElement("img")
        image.src = works[i].imageUrl;
        boite.appendChild(image)

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].title;
        boite.appendChild(titre);
        titre.setAttribute("id", works[i].categoryId);
    }
}


//Appel des fonctions
await generationFiltres();
await generationGallery();

//Récupération des bouttons
const btn0 = document.querySelector (".filtre-0");
const btn1 = document.querySelector (".filtre-1");
const btn2 = document.querySelector (".filtre-2");
const btnTous = document.querySelector (".filtre-all");
const listeBtn = [btn0, btn1, btn2];


//Création des élements de la Gallery selon le filtre pressé

for (let i = 1; i < listeBtn.length; i++) {
    listeBtn[i].addEventListener("click", () => {
        // Effacer le contenu de la balise cartes
        gallery.innerHTML = "";

        let boite = document.createElement("figure");

        let image = document.createElement("img")
        image.src = works[i].image;
        boite.appendChild(image)

        let titre = document.createElement("figcaption");
        titre.innerText = works[i].name;
        boite.appendChild(titre);

        gallery.appendChild(boite);
    });
}


//Exception faite pour le boutton filtre "Tous"

btnTous.addEventListener("click", () => {
    gallery.innerHTML = "";
    generationGallery();
})





