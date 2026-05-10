let works= [];

async function recupereTravaux() {
  const response = await fetch ("http://localhost:5678/api/works");
  const data = await response.json ();
  return data ;
  
}
async function initialiserProjet() {
  works = await recupereTravaux();
  afficherProjets (works) ;
}




function afficherProjets(projets){
 const gallery = document.querySelector (".gallery");

   gallery.innerHTML = "";


projets.forEach(work => {
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

async function recupereCategorie (){
  const response= await fetch ("http://localhost:5678/api/categories");
  const data = await response.json ();
  return data ;
}
  
async function initialiseCategorie() {
   const listeCategorie = await recupereCategorie();
  afficherCategorie (listeCategorie);

}




function afficherCategorie (categorie){
   const filter = document.querySelector(".filter");

    categorie.forEach((categorie) => {

      const bouton = document.createElement("button");

      bouton.innerText = categorie.name;

      filter.appendChild(bouton);

      bouton.addEventListener("click", () => {
console.log("jai cliquer",categorie.id);

const projetsFiltres = works.filter (work => {
    return work.categoryId ===categorie.id;

})
afficherProjets(projetsFiltres);
      });

    });

  };
  
initialiserProjet ();
initialiseCategorie () ;



  
