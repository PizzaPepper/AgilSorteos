const mongoose = require('mongoose');

const Boleto = {
    sorteo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sorteo'
    },
    numero: Number,
    comprobantePago: String,
    estado: String,
    fechaDeMovimiento: Date,
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'usuario'
    }
};




const boletoSchema = new mongoose.Schema(Boleto);
const boletoModel = mongoose.model('boleto',boletoSchema);

module.exports = boletoModel;