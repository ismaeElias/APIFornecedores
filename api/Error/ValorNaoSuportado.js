class ValorNaoSuportado extends Error{
    constructor(contentType){
        super(`O tipo do conteúdo ${contentType} não é suportado!`);
        this.name = 'ValorNaoSuportado';
        this.idError = 3;
    }
}   

module.exports = ValorNaoSuportado;