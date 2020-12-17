const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");

roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200);
  res.send(JSON.stringify(resultados));
});

roteador.post("/", async (req, res) => {
    try{
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        res.status(201);
        res.send(JSON.stringify(fornecedor));
    } catch(error){
        res.status(400);
        res.send(JSON.stringify({mensagem : error.message}));
    }   
});

roteador.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        res.status(200);
        res.send(JSON.stringify(fornecedor));
    } catch(error){
        res.status(404);
        res.send(JSON.stringify({mensagem : error.message}));
    }
});

roteador.put("/:id", async ( req, res) => {
    try {
        const id = req.params.id;
        const dadosRecebidos = req.body;
        const dados = Object.assign({},dadosRecebidos,{id : id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        res.status(204);
        res.end();
    } catch(error){
        res.status(400);
        res.send(JSON.stringify({mensagem : error.message}));
    }
})

roteador.delete("/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar();
        await fornecedor.remover();
        res.status(204);
        res.end();
    } catch(error){
        res.status(404);
        res.send(JSON.stringify({mensagem : error.message}));
    }
})
module.exports = roteador;
