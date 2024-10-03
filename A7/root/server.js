const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());

app.use(cors());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: '3307'
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendStatus(200); // Login bem-sucedido
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
        if (err) throw err;
        res.sendStatus(201); 
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});