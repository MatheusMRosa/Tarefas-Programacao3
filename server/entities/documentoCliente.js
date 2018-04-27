const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cliente = new schema({
    nome: { type: 'String', required: true },
    cpf: {
        type: 'String',
        validate: function () {
            return !this.cnpj;
        }
    },
    cnpj: {
        type: 'String',
        validate: function () {
            return !this.cpf;
        }
    },
    endereco: { type: 'String', required: true},
    estado: { type: 'String', required: true},
    cep: { type: 'String', required: true},
    observacoes: { type: 'String'},

});

module.exports = mongoose.model('cliente', cliente);