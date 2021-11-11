const mongoose = require('mongoose');

const Sorteo = {
    rangoDeNumeros: Map,
    precioDeNumeros:Number,
    fechaInicioDeVenta:Date,
    fechaFinDeVenta:Date,
    fechaDeCreacion:
    {
        type:Date,
        default:Date.now
    },
    fechaSorteo:Date,
    diasLimiteApartado:Number,
    imagen:String,
    nombre:String,
    descripcion:String,
    estado:String
};

module.exports = Sorteo;