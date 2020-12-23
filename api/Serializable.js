const ValorNaoSuportado = require("./Error/ValorNaoSuportado");
const jsontoxml = require('jsontoxml');

class Serializable{
    json(dados){
        return JSON.stringify(dados);
    }

    xml(dados){
        let tag = this.tagSingular;
        if(Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map(item => {
                return {
                    [this.tagSingular] : item
                }
            })
        }

        return jsontoxml({[tag] : dados});
    }
    serializar(dados) {
        dados = this.filtrar(dados);
        if(this.contentType === 'application/json'){
            return this.json(dados);
        }
        if(this.contentType === 'application/xml'){
            return this.xml(dados);
        }
        throw new ValorNaoSuportado(this.contentType);
    }

    filtrarObjeto(dados){
        const novoObj = {}

        this.campoPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)){
                novoObj[campo] = dados[campo];
            }
        });

        return novoObj;
    }

    filtrar(dados){
        if(Array.isArray(dados)){
            dados = dados.map(item => {
                return this.filtrarObjeto(item);
            });
        } else {
            dados = this.filtrarObjeto(dados);
        }

        return dados;
    }
}


class SerializableFornecedor extends Serializable{
    constructor(contentType, camposExtras){
        super();
        this.contentType = contentType;
        this.campoPublicos = ['id','empresa','categoria'].concat(camposExtras || []);
        this.tagSingular = 'Fornecedor';
        this.tagPlural = 'Fornecedores';
    }
}

class SeriazableError extends Serializable{
    constructor(contentType,camposExtras){
        super();
        this.contentType = contentType;
        this.campoPublicos = [
            'id',
            'mensagem'
        ].concat(camposExtras || []);        
        this.tagSingular = 'erro';
        this.tagPlural = 'erros';
    }
}

module.exports = {
    Serializable : Serializable,
    SerializableFornecedor : SerializableFornecedor,
    SeriazableError : SeriazableError,
    formatosAceitos : ['application/json', 'application/xml']
};