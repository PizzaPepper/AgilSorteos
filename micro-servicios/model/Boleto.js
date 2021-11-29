/**
 * Boleto.js
 * Archivo js que sirve como modelo de datos para el objeto Boleto
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema(
    {
        numero: {type: Number, require},
        comprobantePago: String,
        estado:{
            type:String,
            enum:['LIBRE','APARTADO','PAGADO'],
            dafault:'LIBRE'
        },
        tipoPago:{
            type:String,
            enum:['PAYPAL','TRANSFERENCIA','EFECTIVO'],
            default:'PAYPAL'
        },        
        movimientoBoleto: {
            //TODO: Ver luego
            fecha:Date,
            descripcion:String
        },
        persona: {
            nombre:String,
            correo:String,
            direccion:String,
            numTelefono:String,
            ciudad:String,
            entidad:String
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