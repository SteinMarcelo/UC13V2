// Atualizar Cadastro
document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validação simples de senhas
  if (password && password !== confirmPassword) {
    document.getElementById("message").textContent = "As senhas não coincidem.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/update", {
      method: "PUT", // Método PUT para atualização
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const messageElement = document.getElementById("message");

    if (response.ok) {
      messageElement.textContent = "Cadastro atualizado com sucesso!";
      setTimeout(() => {
        window.location.href = "index.html"; // Redireciona após sucesso
      }, 2000);
    } else {
      const errorMessage = await response.text();
      messageElement.textContent = errorMessage;
    }
  } catch (error) {
    document.getElementById("message").textContent =
      "Erro ao tentar atualizar o cadastro.";
  }
});

// Deletar Conta
document.getElementById("deleteButton").addEventListener("click", async () => {
  const confirmDelete = confirm("Tem certeza que deseja deletar sua conta?");

  if (confirmDelete) {
    try {
      const email = document.getElementById("email").value;

      const response = await fetch("http://localhost:3000/delete", {
        method: "DELETE", // Método DELETE para remoção de conta
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const messageElement = document.getElementById("message");

      if (response.ok) {
        messageElement.textContent = "Conta deletada com sucesso!";
        setTimeout(() => {
          window.location.href = "index.html"; // Redireciona após exclusão
        }, 2000);
      } else {
        const errorMessage = await response.text();
        messageElement.textContent = errorMessage;
      }
    } catch (error) {
      document.getElementById("message").textContent =
        "Erro ao tentar deletar a conta.";
    }
  }
});
