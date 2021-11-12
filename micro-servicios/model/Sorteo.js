const mongoose = require('mongoose');

const Sorteo = {
    rangoDeNumeros: {type:Map,of:Number},
    precioDeNumeros: Number,
    fechaInicioDeVenta: Date,
    fechaFinDeVenta: Date,
    fechaDeCreacion: { type: Date, default: Date.now },
    fechaDeSorteo: Date,
    diasLimiteApartado: Number,
    imagen: String,
    nombre: String,
    descripcion: String,
    estado: String 
};




const sorteoSchema = new mongoose.Schema(Sorteo);
const sorteoModel = mongoose.model('sorteo',sorteoSchema);

module.exports = sorteoModel;