fetch ("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
   const gallery = document.querySelector (".gallery");
  


   data.forEach(work => {
console.log(work);
   });
    
  
})