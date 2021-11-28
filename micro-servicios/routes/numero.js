/**
 * numeros.js
 * Archivo js con la finalidad de almacenar y gestionar las peticiones Http del cliente
 * en cuanto a numeros se refiere.
 * Fecha: 15 - 11 - 2021
 * @author: "La comunidad del anillo"
 */
 const {Router} = require('express');
 const mongoose = require('mongoose');

 mongoose.pluralize(null);

const sorteoModel = require('../model/Sorteo');
const boletoModel = require('../model/Boleto');
const clienteModel = require('../model/Cliente');

const router = Router();

router.get('/nombreSorteo/:id',async(req,res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    if(dataSorteo != null)
    {
        const tituloSorteo = dataSorteo.titulo;
        res.status(201).json({titulo:tituloSorteo});
    }
    else{
        res.status(401).json({message:"No se ha encontrado el elemento"});
    }
})

/**
 * Método encargado de recibir una petición HTTP GET y de esta forma buscar en BD
 * el sorteo y boletos y devolver un json con estos.
 */
router.get('/todos/:id', async(req,res)=>{    
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    });
    
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        let dataBoletos = dataSorteo.boletos;
        let auxBoletos = [];
        
        
        for(x of dataBoletos)
        {
            let auxBoleto;
            if(x.cliente!=null){
                auxBoleto =
            {
                id: x._id,
                numero: x.numero,
                estado: x.estado,
                nombreCliente: x.cliente.nombre
            };
            }else{
                auxBoleto =
            {
                id: x._id,
                numero: x.numero,
                estado: x.estado,
            };
            }
            
            auxBoletos.push(auxBoleto);
        }
        const listaBoletos = auxBoletos;
        res.status(201).json(listaBoletos);
    }
    else{
        res.status(401).json({message:"Recurso no encontrado"})
    }
});
/**
 * Método encargado de recibir una petición HTTP GET y realizar una consulta a la BD
 * y filtrar los números apartados.
 */
router.get('/apartados/:id', async (req,res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({
        path:"boletos",
        populate:{path:"cliente"}
    }); 
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {       
        //Se realiza el filtrado de los números que tengan el estado apartado.
        const boletosApartados = dataSorteo.boletos.filter(x => x.estado=="APARTADO");
        let auxBoletosA = [];
        /*Mediante un foreach guardamos en una lista auxiliar los
        boletos en json's con los datos que realmente nos interesan.*/
        for(x of boletosApartados)
        {
            let auxBoleto =      
            {
                id: x._id,
                numero: x.numero,
                estado: x.estado,
                nombreCliente: x.cliente.nombre
            }
            auxBoletosA.push(auxBoleto);
        }
        //Creamos la constante con la lista actualizada y la enviamos
        const listaBoletosA = auxBoletosA;
        res.status(201).json(listaBoletosA);
    }
    else{
        //En caso de no encontrar el sorteo o los números devolvemos un mensaje de error.
        res.status(401).json({message:"No se ha encontrado el elemento"});
    }
});

/**
 * Método encargado de recibir una petición HTTP GET y de esta forma realizar una consulta a la BD
 * y obtener los boletos de un sorteo en especifico, para despues filtrar los boletos pagados
 * y devolver un json con estos dentro.
 */
router.get('/pagados/:id', async (req,res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({path:"boletos",model:"boleto"});    
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        //Se guardan en una constante los boletos filtrados que tengan el estado "PAGADO".
        const listaPagados = dataSorteo.boletos.filter(x => x.estado=="PAGADO");
        let auxBoletosP = [];
        /*Mediante un foreach nos quedamos con los datos que si nos interesan y los guardamos en un
        y los almacenamos en un json y lo agregamos en una lista provisional.
        */
        for(x of listaPagados)
        {
            let auxBoleto =
            {
                id: x._id,
                numero: x.numero,
                estado: x.estado,
                nombreCliente: x.cliente.nombre
            }
            auxBoletosP.push(auxBoleto);
        }
//Se crea la constante donde se enviaran los datos en base a la lista auxiliar.        
        const listaBoletosP = auxBoletosP;
        res.status(201).json(listaBoletosP);
    }
    else{
        //En caso de no encontrar el elemento, se enviara un json con un mensaje de error.
        res.status(401).json({message:"No se ha encontrado el elemento"});
    }
});

/**
 * Método encargado de recibir una petición HTTP GET y mediante esta realizar una
 * consulta a la BD donde obtenga los boletos o números y filtrar los boletos
 * que tengan el esatado "libre".
 */
router.get('/disponibles/:id', async(req,res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({path:"boletos",model:"boleto"});    
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        /*Se filtran los boletos que tengan el estado "libre"*/
        const listaDisponibles = dataSorteo.boletos.filter(x => x.estado=="LIBRE");
        let  auxBoletosD = [];
        /*Mediante un foreach nos quedamos con los datos que si nos interesan y los guardamos en un
        y los almacenamos en un json y lo agregamos en una lista provisional.
        */        
        for(x of listaDisponibles)
        {
            let auxBoleto =
            {
                id: x._id,
                numero: x.numero,
                estado: x.estado
            }
            auxBoletosD.push(auxBoleto);
        }
        /*Se crea una constante en base a la lista auxiliar para enviar los datos*/
        const listaBoletosD = auxBoletosD;
        res.status(201).json(listaBoletosD);
    }    
    else{
        //En caso de un error se enviará un json con un mensaje de error.
        res.status(401).json({message:"Elemento no encontrado"});
    }
});


module.exports = router;