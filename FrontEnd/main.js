fetch ("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
   const gallery = document.querySelector (".gallery");
  


data.forEach(work => {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  const figcaption = document.createElement("figcaption");
  figcaption.innerText = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  gallery.appendChild(figure);
  console.log (work)
});
  
})

fetch ("http://localhost:5678/api/categories")
.then (response => response.json())
.then (data => {
    const filter = document.querySelector (".filter");
    
    data.forEach (categorie => {
        const bouton = document.createElement ("button");
       bouton.innerText = categorie.name;
       filter.appendChild(bouton)
        console.log (bouton)
       
    })
})