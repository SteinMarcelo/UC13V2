const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const mazeElement = document.getElementById("maze");
const startButton = document.getElementById("startButton");
const loseImage = document.getElementById("loseImage");
let playerPosition = { x: 4, y: 5 };
const loseSound = document.getElementById("loseSound");

function createMaze() {
  mazeElement.innerHTML = ""; // Limpa o labirinto antes de recriar
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell === 1) {
        cellElement.classList.add("wall");
        cellElement.addEventListener("mouseenter", () => handleLoss());
      } else if (x === 8 && y === 8) {
        cellElement.classList.add("goal");
      } else if (x === 1 && y === 1) {
        cellElement.classList.add("start");
      }
      mazeElement.appendChild(cellElement);
    });
  });
  updatePlayerPosition();
}

function updatePlayerPosition() {
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.classList.remove("player"));
  const playerCell =
    mazeElement.children[playerPosition.y * 10 + playerPosition.x];
  playerCell.classList.add("player");
  playerCell.textContent = "🎃";
}

function handleMouseMove(e) {
  const cellSize = 40;
  const mazeRect = mazeElement.getBoundingClientRect();
  const x = Math.floor((e.clientX - mazeRect.left) / cellSize);
  const y = Math.floor((e.clientY - mazeRect.top) / cellSize);

  if (x >= 0 && x < 10 && y >= 0 && y < 10 && maze[y][x] === 0) {
    playerPosition = { x, y };
    updatePlayerPosition();

    if (x === 8 && y === 8) {
      alert("Parabéns! Você completou o labirinto!");
      window.location.reload();
    }
  }
}

function handleLoss() {
  loseSound.currentTime = 0;
  loseSound.play();
  loseImage.style.display = "block"; // Exibe a imagem de perda em tela cheia
  mazeElement.style.display = "none"; // Esconde o labirinto
  startButton.style.display = "none"; // Esconde o botão de início
}

startButton.addEventListener("click", () => {
  mazeElement.style.display = "grid"; // Mostra o labirinto
  createMaze(); // Inicializa o labirinto
  mazeElement.addEventListener("mousemove", handleMouseMove); // Ativa o movimento
  startButton.style.display = "none"; // Esconde o botão de início
});
