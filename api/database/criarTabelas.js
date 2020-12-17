const ModeloTabela = require("../routes/fornecedores/modeloTabelaFornecedor");

ModeloTabela.sync()
  .then(() => {
    console.log("Tabela criada com sucesso");
  })
  .catch(console.log());
