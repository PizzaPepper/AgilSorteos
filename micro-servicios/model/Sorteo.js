const mongoose = require('mongoose');



const sorteoSchema = new mongoose.Schema({
    numMin: { type: Number, required: true },
    numMax: { type: Number, required: true },
    precioNumeros: { type: Number, required: true },
    fechaInicioVenta: { type: Date, required: true },
    fechaFinVenta: { type: Date, required: true },
    fechaSorteo: { type: Date, required: true },
    diasLimiteApartado: { type: Number, required: true },
    imagen: { type: String, required: false },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    tiempoRecordatorio: { type: Number, required: true },
    boletoGanador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boleto',
        autopopulate: true,
    },
    boletos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boleto',
            autopopulate: true,
        }],
    
});





const sorteoModel = mongoose.model('sorteo',sorteoSchema);

module.exports = sorteoModel;