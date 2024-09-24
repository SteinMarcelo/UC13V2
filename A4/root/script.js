// Evento de clique no botão
document.getElementById("clickButton").addEventListener("click", function () {
  alert("Você clicou no botão!");
});

// Evento de digitação no campo de texto
document
  .getElementById("inputField")
  .addEventListener("input", function (event) {
    console.log("Você digitou: " + event.target.value);
  });

// Evento de passar o mouse sobre o texto
document.getElementById("hoverText").addEventListener("mouseover", function () {
  this.style.backgroundColor = "yellow";
  this.textContent = "Você passou o mouse aqui!";
});

document.getElementById("hoverText").addEventListener("mouseout", function () {
  this.style.backgroundColor = "lightgray";
  this.textContent = "Passe o mouse aqui";
});
