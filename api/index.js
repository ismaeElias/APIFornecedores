const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const roteador = require('./routes/fornecedores');
const NaoEncontrado = require('./Error/NaoEncontrado');
const CampoInvalido = require('./Error/CampoInvalido');
const DadosNaoFornecidos = require('./Error/DadosNaoFornecidos');
const ValorNaoSuportado = require('./Error/ValorNaoSuportado');
const {formatosAceitos} = require('./Serializable');
const SeriazableError = require('./Serializable').SeriazableError;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept');

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json';
    }
    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406);
        res.end();
        return
    }

    res.setHeader('Content-Type', formatoRequisitado);
    next();
});

app.use('/api/fornecedores', roteador);

app.use((error,req, res, next) =>{
    let status = 500;

    if(error instanceof NaoEncontrado){
        status = 404;
    }
    if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos){
        status = 400;
    }
    if(error instanceof ValorNaoSuportado){
        status = 406;
    }
    
    const serializable = new SeriazableError(
        res.getHeader('Content-Type')
    );
    res.status(status);
    res.send(serializable.serializar(
        {
            mensagem : error.message,
            id : error.idError
        }
    ));
});

app.listen(config.get("api.porta"), ()=> {
    console.log('Servidor rodando');
});