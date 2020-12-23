class NaoEncontrado extends Error{
    constructor(){
        super('Fornecedor não encontrado!');
        this.name = 'NaoEncontrado';
        this.idError = 0;
    }
}

module.exports  = NaoEncontrado;