const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const SECRET_KEY = "seu_segredo_aqui";

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
  port: "3307",
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email ou senha faltando");
    return res.status(400).send("Email e senha são obrigatórios");
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).send("Erro no servidor");
      }

      console.log("Resultados da consulta:", results);

      if (results.length === 0) {
        console.log("Nenhum usuário encontrado");
        return res.status(401).send("Credenciais inválidas");
      }

      const user = results[0];

      // Adicione logs para depuração
      console.log("Senha fornecida:", password);
      console.log("Hash armazenado:", user.password);

      try {
        const match = await bcrypt.compare(password, user.password); // Correção aqui
        if (match) {
          res.sendStatus(200); // Login bem-sucedido
        } else {
          console.log("Senha não coincide");
          res.status(401).send("Credenciais inválidas");
        }
      } catch (compareErr) {
        console.error("Erro ao comparar senhas:", compareErr);
        res.status(500).send("Erro no servidor");
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Gerar um hash da senha
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          return res.status(400).send("Usuário já existe");
        }
        db.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hash],
          (err, result) => {
            if (err) throw err;
            res.sendStatus(201);
          }
        );
      }
    );
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
