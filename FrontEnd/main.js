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

let works= [];

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
  works = await recupereTravaux();
  const categories = await recupereCategorie();

  afficherProjets(works);
  afficherProjetsModal(works);
  afficherCategorie(categories, works);
  afficherCategorieSelect(categories);
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
    const modalItem =document.createElement("div");
    modalItem.classList.add("modal-item");
    modalItem.dataset.id = work.id;

     const corbeille = document.createElement("i");
    corbeille.classList.add("fa-solid", "fa-trash-can");

    corbeille.addEventListener("click",async function(){
    console.log(work.id);
   const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`
  }
});
     if (response.ok) {
  modalItem.remove();
}
    })

    img.src = work.imageUrl;
    img.alt = work.title;
    modalItem.appendChild(img);
     modalItem.appendChild(corbeille);
    modalGallery.appendChild(modalItem);

   });
}
const btnAjoutPhoto=document.querySelector(".add-photo");
const ajoutPhoto=document.querySelector(".ajout-photo");
const vueGallery=document.querySelector(".vue-gallery");


btnAjoutPhoto.addEventListener("click", function(){
  vueGallery.style.display = "none";
  ajoutPhoto.style.display= "flex";
  


  console.log(btnAjoutPhoto);
console.log(ajoutPhoto);

  
});

const retourModal = document.querySelector(".retour-modal");

retourModal.addEventListener("click", function(){
  vueGallery.style.display = "block";
  ajoutPhoto.style.display = "none";
});


const inputImage = document.getElementById("image");
const previewImage = document.querySelector(".preview-photo");
const iconImage = document.querySelector(".upload-photo i");
const labelImage = document.querySelector(".upload-photo label");
const texteImage = document.querySelector(".upload-photo p");
const btnValider = document.querySelector (".btn-valider");
const titleInput= document.getElementById("title");
const categorySelect = document.getElementById("category");

function verifierFormulaire(){
  const imageOk =inputImage.files.length > 0 ;
  const titleOk = titleInput.value.trim() !== "";
  const categoryOk = categorySelect.value !== "";
  if (imageOk && titleOk && categoryOk){
    btnValider.style.backgroundColor =  "#1D6154";
    btnValider.disabled = false;
  }
  else {
    btnValider.disabled =true;
  }
};
verifierFormulaire();

titleInput.addEventListener("input", function (){
  verifierFormulaire();
})
categorySelect.addEventListener("change", function (){
  verifierFormulaire();
})


inputImage.addEventListener("change", function(){
   previewImage.src = URL.createObjectURL(inputImage.files[0]);
   previewImage.style.display = "block";
   iconImage.style.display = "none";
labelImage.style.display = "none";
texteImage.style.display = "none";
verifierFormulaire();

});


const formAjoutPhoto = document.querySelector(".ajout-photo form");

formAjoutPhoto.addEventListener("submit",async function (event){
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("image", inputImage.files[0]);
    formData.append("category", document.getElementById("category").value);
    const response = await fetch("http://localhost:5678/api/works",{
        method: "POST",

        headers: {
          Authorization:`Bearer ${token}`
        },

        body: formData,
    });
    console.log(response);
    const newWork = await response .json();
    console.log(newWork);
    works.push(newWork);
    afficherProjets(works);
    afficherProjetsModal(works);
    formAjoutPhoto.reset();

    previewImage.style.display = "none";
previewImage.src = "";

iconImage.style.display = "block";
labelImage.style.display = "block";
texteImage.style.display = "block";
ajoutPhoto.style.display = "none";
vueGallery.style.display = "block";
    
  });

  function afficherCategorieSelect(categories){
    const selectCategory = document.getElementById("category");

    categories.forEach(categorie => {
      const option = document.createElement("option");

      option.value = categorie.id;
      option.innerText = categorie.name;

      selectCategory.appendChild(option);
    })
  }









