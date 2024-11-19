const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Olá, mundo! 🌍");
});

// Faz o servidor ouvir na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
