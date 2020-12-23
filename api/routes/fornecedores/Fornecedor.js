const TabelaFornecedor = require('./TabelaFornecedor');
const CampoInvalido = require('../../Error/CampoInvalido');
const DadosNaoFornecidos = require('../../Error/DadosNaoFornecidos');

class Fornecedor {
  constructor({
    id,
    empresa,
    email,
    categoria,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
      this.id = id;
      this.empresa = empresa;
      this.categoria = categoria;
      this.email = email;
      this.dataCriacao = dataCriacao;
      this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar(){
        this.validar();
        const resultado = await TabelaFornecedor.inserir({
            empresa : this.empresa,
            email : this.email,
            categoria : this.categoria
        });

        this.id =resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    async carregar(){
        const encontrado = await TabelaFornecedor.findById(this.id);
        this.empresa = encontrado.empresa;
        this.email = encontrado.email;
        this.categoria = encontrado.categoria;
        this.dataCriacao = encontrado.dataCriacao;
        this.dataAtualizacao = encontrado.dataAtualizacao;
        this.versao = encontrado.versao;
    }
    
    async atualizar(){
        await TabelaFornecedor.findById(this.id);
        const campos = ['empresa','email','categoria'];
        const dadosAtualizar = {}
        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0){
                dadosAtualizar[campo] = valor;
            }
        })
        if(Object.keys(dadosAtualizar).length === 0 ){
            throw new DadosNaoFornecidos();
        }
        await TabelaFornecedor.atualizar(this.id,dadosAtualizar);
    }

    remover(){
        return TabelaFornecedor.remover(this.id);
    }

    validar(){
        const campos = ['empresa','email','categoria'];
        campos.forEach((campo) => {
            const valor = this[campo];
            
            if(typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo);
            }
        })
    }
}

module.exports = Fornecedor;
