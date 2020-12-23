const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const NaoEncontrado = require("../../Error/NaoEncontrado");
const SerializableFornecedor = require('../../Serializable').SerializableFornecedor;


roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200);
  const serializable = new SerializableFornecedor(res.getHeader('Content-Type'));
  res.send(serializable.serializar(resultados));
});

roteador.post("/", async (req, res, next) => {
    try{
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        res.status(201);
        const serializable = new SerializableFornecedor(res.getHeader('Content-Type'));
        res.send(serializable.serializar(fornecedor));
    } catch(error){
       next(error);
    }   
});

roteador.get("/:id", async (req, res,next) => {
    try{
        const id = req.params.id;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        res.status(200);
        const serializable = new SerializableFornecedor(res.getHeader('Content-Type'),['email','dataCriacao','dataAtualizacao','versao']);
        res.send(serializable.serializar(fornecedor));
    } catch(error){
        next(error);
    }
});

roteador.put("/:id", async ( req, res, next) => {
    try {
        const id = req.params.id;
        const dadosRecebidos = req.body;
        const dados = Object.assign({},dadosRecebidos,{id : id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        res.status(204);
        res.end();
    } catch(error){
        next(error);
    }
})

roteador.delete("/:id", async (req,res,next) => {
    try {
        const id = req.params.id;
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar();
        await fornecedor.remover();
        res.status(204);
        res.end();
    } catch(error){
        next(error);
    }
})
module.exports = roteador;
