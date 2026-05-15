const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    headers: {
      "Content-Type": "application/json"
    },

    method: "POST",

    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  if (response.ok) {

    const data = await response.json();

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";

  } else {

    const erreurConnection = document.getElementById ("error-message");
    erreurConnection.innerText = "Email ou mot de passe incorrect";

  }

});
  

