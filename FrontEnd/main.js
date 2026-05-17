const token = localStorage.getItem("token");

if (token){
  const loginLink=document.getElementById ("login-link");
  loginLink.innerText = "logout";

  
    const editionMode =document.querySelector(".mode-edition");
    editionMode.style.display = "flex";

    const modifier =document.querySelector(".modifier");
    modifier.style.display = "flex";

 
  const filter=document.querySelector(".filter");
  filter.style.display = "none";
    
  loginLink.addEventListener("click", function (event){
    event.preventDefault();

    localStorage.removeItem("token");
    window.location.href = "index.html";

  });

}

async function recupereTravaux() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  return data;
}

async function recupereCategorie() {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();
  return data;
}

function afficherProjets(works) {
  const gallery = document.querySelector(".gallery");

  gallery.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  });
}

function afficherCategorie(categories, works) {
  const filter = document.querySelector(".filter");
const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";

filter.appendChild(boutonTous);

boutonTous.addEventListener("click", () => {
  afficherProjets(works);
});
  categories.forEach(categorie => {
    const bouton = document.createElement("button");

    bouton.innerText = categorie.name;

    filter.appendChild(bouton);

    bouton.addEventListener("click", () => {
      console.log("j'ai cliqué", categorie.id);

      const projetsFiltres = works.filter(work => {
        return work.categoryId === categorie.id;
      });

      afficherProjets(projetsFiltres);
    });
  });
}

async function initialiserProjet() {
  const works = await recupereTravaux();
  const categories = await recupereCategorie();

  afficherProjets(works);
  afficherProjetsModal(works);
  afficherCategorie(categories, works);
  console.log(works, categories)
}


initialiserProjet();


const modifier =document.querySelector(".modifier");
const modal =document.querySelector (".modal");
const modalClose = document.querySelector (".close-modal");
const modalContent = document.querySelector (".modal-content");

modifier.addEventListener("click", function(){
  modal.style.display = "flex";

})
modalClose.addEventListener("click", function(){
  modal.style.display = "none";
});

modal.addEventListener("click",function(){
  modal.style.display = "none";
});

modalContent.addEventListener("click", function(){
  event.stopPropagation();
});

function afficherProjetsModal (projets) {
  const modalGallery = document.querySelector(".modal-gallery");

  modalGallery.innerHTML= "";

  projets.forEach(work =>{
    const img =document.createElement("img");

    img.src = work.imageUrl;
    img.alt = work.title;
    modalGallery.appendChild(img)
  });
}



