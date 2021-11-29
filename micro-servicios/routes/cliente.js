/**
 * sorteo.js
 * Archivo js con la finalidad de almacenar y gestionar las peticiones Http del cliente
 * en cuanto a clientes se refiere.
 * Fecha: 29 - 11 - 2021
 * @author: "La comunidad del anillo"
 */

/**
 * Se importan los módulos  que serán utilizados para trabajar.
 */
//Se importa el módulo express para servidores.
const {Router} = require('express');
//Se importa el módulo mongoose para la gestión de base de datos no relacionales MongoBD
const mongoose = require('mongoose');

// Se desactiva el pluralizador con el objetivo de que el nombre de las rutas no se cambien.
mongoose.pluralize(null);

//Se importan los modelos para los objetos de Sorteo y Boleto
const sorteoModel = require('../model/Sorteo');
const boletoModel = require('../model/Boleto');
const clienteModel = require('../model/Cliente');
//Se importa el modulo Router para la manipulación de las peticiones HTTP
const router = Router();

router.get('/todos/:id', (req, res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    });
    const formatDate = (date)=>{
        let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return formatted_date;
    }

    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        let dataBoletos = dataSorteo.boletos;
        let auxClientes = [];
        for(x of dataBoletos)
        {
            let auxCliente;
            if(x.cliente != null)
            {
                auxCliente =
                {
                    numero: x.numero,
                    estado: x.estado,
                    nombreCliente: x.cliente.nombre,
                    fechaMovimiento: formatDate(x.movimientoBoleto.fecha)
                }
            }
        }
    }
});

router.get('/apartados/:id',(req,res) =>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    });
    const diasDePlazo = (1000 * 60 * 25 * dataSorteo.diasLimiteApartado);
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        //Pequeño método para dar formato a una fecha.
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            return formatted_date;
        }
        const boletosApartados = dataSorteo.boletos.filter(x => x.estado=="APARTADO");
        let auxClientes = [];

        for(x of dataBoletos)
        {            
            let auxCliente;
            if(x.cliente != null)
            {
                //Se le suman los dias de plazo que se tengan.
                let suma = x.movimientoBoleto.fecha.getTime() + diasDePlazo;
                let diaPago = new Date(suma);
                auxCliente =
                {
                    numero: x.numero,
                    estado: x.estado,
                    nombreCliente: x.cliente.nombre,
                    fechaMovimiento: formatDate(x.movimientoBoleto.fecha),
                    fechaPago: formatDate(diaPago)
                }
                auxClientes.push(auxCliente);
            }
        }
    }

});

module.exports = router;