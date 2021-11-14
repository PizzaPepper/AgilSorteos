/**
 * Sorteo.js
 * Archivo js que sirve como modelo de datos para el objeto Sorteo
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */
const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
    numMin: { type: Number, required: true },
    numMax: { type: Number, required: true },
    precioNumeros: { type: Number, required: true },
    fechaInicioVenta: { type: Date, required: true },
    fechaFinVenta: { type: Date, required: true },
    fechaCreacion: {type: Date, require: true},
    fechaSorteo: { type: Date, required: true },
    diasLimiteApartado: { type: Number, required: true },
    imagen: { type: String, required: false },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    estadoSorteo:{
        type:String,
        enum:['VIGENTE','TERMINADO','ESPERA'],
        default:'VIGENTE'
    },
    tiempoRecordatorio: { type: Number, required: true },
    boletoGanador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boleto',
        autopopulate: true,
    },
    //Que se lo deje ahí
    boletos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'boleto',
            autopopulate: true,
        }], 

});





const sorteoModel = mongoose.model('sorteo',sorteoSchema);

module.exports = sorteoModel;