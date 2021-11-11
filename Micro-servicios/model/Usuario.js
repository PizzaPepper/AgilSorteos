const mongoose = require('mongoose');
const Boleto = require('./Boleto');

const Usuario = {
    nombre:String,
    contrasenia:String,
    correo:String,
    numeroDeContacto:String,
    direccion:String,
    boletos:[{type: mongoose.Schema.Types.ObjectId, ref:Boleto}]
};

module.exports = Usuario;