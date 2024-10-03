document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const senha = password;
    const teste = 10;

    bcrypt.hash(senha, teste, (err, hash) => {
      if (err) throw err;
      console.log(hash);
    });

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const messageElement = document.getElementById("message");
    if (response.ok) {
      messageElement.textContent = "Usuário registrado com sucesso!";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      const errorMessage = await response.text();
      messageElement.textContent = errorMessage;
    }
  });
