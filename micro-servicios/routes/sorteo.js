/**
 * sorteo.js
 * Archivo js con la finalidad de almacenar y gestionar las peticiones Http del cliente
 * en cuanto a sorteos se refiere.
 * Fecha: 13 - 11 - 2021
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
//Se importa el modulo Router para la manipulación de las peticiones HTTP
const router = Router();

/**
 * Este método se encarga de obtener la lista de sorteos
 */
router.get('/lista', async (req,res)=>{
    const data = await sorteoModel.find()
    .populate({path:"boletos",model:"boleto"})
    .populate({path:"boletoGanador",model:"boleto"});
    res.json(data);
});

/**
 * Este método se encarga de recibir la petición HTTP GET pero con un id en la URL
 * para realizar una consulta a la BD con ese id en especifico.
 */
router.get('/lista/:id', async (req,res)=>{        
    const id = req.params.id;
    //Se crea un hilo para realizar una consulta a la BD
    const dataSorteo = await sorteoModel.findOne({_id:id})
    //Se utiliza el populate para ver el contenido del identificador en una sola consulta.
    .populate({path:"boletos",model:"boleto"})
    .populate({path:"boletoGanador",model:"boleto"});
    //Se realiza una sentencia if para asegurar que el objeto encontrado no sea nulo
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        /*Se obtienen los datos de los boletos obtenido por la consulta
        y en  base a ellos se calculan los demas.*/
        const dataBoletos = dataSorteo.boletos;
        const totales = (dataSorteo.numMax - dataSorteo.numMin)+1
        const disponibles = dataBoletos.filter(x => x.estado=="LIBRE").length;
        const pagados = dataBoletos.filter(x => x.estado=="PAGADO").length;
        const apartados = dataBoletos.filter(x => x.estado=="APARTADO").length;
        //Se crea una función ánonima para darle un formato especifico a la fecha para ser exacto "DD/MM/AAAA"
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            return formatted_date;
        };        
        ///Se crea un JSON con el objeto que se acaba de obtener
        const sorteo = {
            sorteo: dataSorteo.titulo,
            dineroActual: dataSorteo.precioNumeros*pagados,
            dineroMeta: dataSorteo.precioNumeros*totales,
            fechaCreacion: formatDate(dataSorteo.fechaCreacion),
            fechaSorteo: formatDate(dataSorteo.fechaSorteo),
            totales: totales,
            disponibles:disponibles,
            pagados:pagados,
            apartados:apartados
        }
    
        res.status(201).json(sorteo);
    }else{
        res.status(401).json({message:"Recurso no encontrado"})
    }
});


module.exports = router;