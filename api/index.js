const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const roteador = require('./routes/fornecedores');
const app = express();

app.use(bodyParser.json());

app.use('/api/fornecedores', roteador);


app.listen(config.get("api.porta"), ()=> {
    console.log('Servidor rodando');
});