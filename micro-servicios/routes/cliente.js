/**
 * sorteo.js
 * Archivo js con la finalidad de almacenar y gestionar las peticiones Http del cliente
 * en cuanto a clientes se refiere.
 * Fecha: 29 - 11 - 2021
 * @author: "La comunidad del anillo"
 * jaja un gallo con tenis
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

/**
 * Método que recibe una petición HTTP GET que regresa un json con los
 * clientes de los boletos con boletos con el estado pagado o apartado.
 */
router.get('/todos/:id',async(req, res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    });
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        let dataBoletos = dataSorteo.boletos;
        //Lista auxiliar para guardar los nuevos jsons.
        let auxClientes = [];
            //Se crea una función ánonima para darle un formato especifico a la fecha para ser exacto "DD/MM/AAAA"
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            return formatted_date;
        };        
        for(x of dataBoletos)
        {
            console.log(x.movimientoBoleto.fecha);
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
                auxClientes.push(auxCliente);
            }
        }
        const listaClientes = auxClientes;
        res.status(201).json(listaClientes);
    }
    else
    {
        res.status(401).json({message:"No se ha encontrado el elemento"});
    }
});

/**
 * Método que recibe una petición HTTP GET con el ID de un sorteo y este regresa un json
 * con los clientes que tengan un boleto con el estado apartado.
 */
router.get('/apartados/:id',async(req,res) =>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    });
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        /*Esta es una constante para calcular la cantidad de dias que se le sumarán
        a la fecha de apartado en milisegundos.*/
        const diasDePlazo = (1000 * 60 * 60 * 24 * dataSorteo.diasLimiteApartado);
        //Se crea una función ánonima para darle un formato especifico a la fecha para ser exacto "DD/MM/AAAA"
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            return formatted_date;
        }
        //Filtramos los boletos apartados.
        const boletosApartados = dataSorteo.boletos.filter(x => x.estado=="APARTADO");
        let auxClientes = [];
        for(x of boletosApartados)
        {            
            let auxCliente;
            if(x.cliente != null)
            {
                /*Se le suman los dias de plazo en milisegundos a la fecha de
                apartados en milisegundos lo cual nos daria la fecha donde se aparto + número de días de vencimiento*/
                let suma = (x.movimientoBoleto.fecha.getTime() + diasDePlazo);
                //Representa la fecha límite de pago.
                let diaPago = new Date(suma);
                var contador = 0;
                //Se crea un objeto(JSON) para enviar los datos que nos son de relevancia.
                auxCliente =
                {                    
                    numero: x.numero,
                    nombreCliente: x.cliente.nombre,
                    fechaMovimiento: formatDate(x.movimientoBoleto.fecha),
                    fechaVencimiento: formatDate(diaPago)
                }
                auxClientes.push(auxCliente);                
            }
        }
        //Se guarda el título.
        const tituloSorteo = dataSorteo.titulo;
        //Se calcula la cantidad de deuda en ese sorteo.
        const adeudoTotal = dataSorteo.precioNumeros * auxClientes.length;
        //Se crea una constante con la lista final, la cantidad de deuda y el número de deudores.
        const listaClientes = {clientes:auxClientes,adeudoTotal:adeudoTotal,numDeudores:auxClientes.length, tituloSorteo:tituloSorteo};
        //Se envia esa constante como respuesta.
        res.status(201).json(listaClientes);
    }
    else
    {
        res.status(401).json({message:"No se ha encontrado el elemento"});
    }
});

module.exports = router;