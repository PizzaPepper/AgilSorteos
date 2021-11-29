/**
 * Cliente.js
 * Archivo js que sirve como modelo de datos para el objeto Usuario
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({    
    nombre:String,
    contrasena:String,
    correo:String,
    direccion:String,
    numeroTelefono:String,
    ciudad:String,
    entidad:String
});

const clienteModel = mongoose.model('cliente',clienteSchema);

module.exports = clienteModel;