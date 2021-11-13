const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true },
        comprobantePago: { type: String },
        tipoPago: { type: String },
        estado: { type: String, required: true },
        movimientoBoleto: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movimientoBoleto',
                autopopulate: true,
            },
        ],
        persona: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sorteo',
            autopopulate: true,
        },
        cliente :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cliente',
            autopopulate: true,
        }
    },
    { collection: 'boleto', versionKey: false }
);


const boletoModel = mongoose.model('boleto',boletoSchema);

module.exports = boletoModel;