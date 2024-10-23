const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const app = express();
const SECRET_KEY = 'seu_segredo_aqui';

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

  // Verificação básica de entrada
  if (!email || !password) {
    return res.status(400).send("Email e senha são obrigatórios");
  }

  // Busca o usuário pelo email
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).send("Erro no servidor");
      }

      // Verifica se resultados estão corretos
      console.log("Resultados da consulta:", results);

      if (results.length > 0) {
        const user = results[0];
        console.log("Dados do usuário:", user);
        if (!user.PASSWORD) {
          console.error("Erro: Hash de senha não encontrado no banco");
          return res
            .status(500)
            .send("Erro no servidor: Hash de senha não encontrado");
        }
        try {
          // Compara a senha fornecida com o hash armazenado no banco
          const match = await bcrypt.compare(password, user.PASSWORD); // Mudei para user.PASSWORD
          if (match) {
            res.sendStatus(200); // Login bem-sucedido
          } else {
            res.status(401).send("Credenciais inválidas");
          }
        } catch (compareErr) {
          console.error("Erro ao comparar senhas:", compareErr);
          res.status(500).send("Erro no servidor");
        }
      } else {
        res.status(401).send("Credenciais inválidas");
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
