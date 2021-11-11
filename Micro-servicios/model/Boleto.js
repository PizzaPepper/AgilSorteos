const mongoose = require('mongoose');

const Boleto = {
    sorteo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sorteo'
    },
    numero: Number,
    comprobantePago: String,
    estado: String,
    fechaDeMovimiento: Date,
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    }
};

module.exports = Boleto;