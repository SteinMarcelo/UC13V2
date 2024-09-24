import express, { Request, Response } from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

// Tipos para o usuário
interface produtos {
  nome: string;
  descricao: string;
  preco: number;
}

// Tipos para o banco de dados
interface QueryResult {
  affectedRows?: number;
  insertId?: number;
}

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meu_banco",
  port: 3307,
});

connection.connect((error) => {
  if (error) {
    console.error("Falha ao conectar ao banco de dados: ");
    return;
  }
  console.log("Conectado ao banco de dados com ID " + connection.threadId);
});

app.post("/produtos", (req: Request, res: Response) => {
    const {nome,descricao,preco}: produtos
});
