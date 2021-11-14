/**
 * Usuario.js
 * Archivo js que sirve como modelo de datos para el objeto Usuario
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

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