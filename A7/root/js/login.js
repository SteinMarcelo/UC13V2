document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email:", email);
  console.log("Password:", password); // Adicione isso para verificar os valores

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const messageElement = document.getElementById("message");
  if (response.ok) {
    window.location.href = "home.html";
  } else {
    const errorMessage = await response.text();
    messageElement.textContent = errorMessage;
  }
});
