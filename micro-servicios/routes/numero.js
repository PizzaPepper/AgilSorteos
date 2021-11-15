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

const router = Router();
/**
 * Método encargado de recibir una petición HTTP GET y de esta forma buscar en bd
 * el sorteo y boletos para despues catalogarlos según su estado y regresar un
 * json con estos datos dentro.
 */
router.get('/listaNumeros/:id', async(req,res)=>{    
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id})
    .populate({path:"boletos",model:"boleto"});    
    if(dataSorteo != null || dataSorteo['boletos'] !== undefined)
    {
        const dataBoleto = dataSorteo.boletos;
/*      const noVendidos = dataBoletos.filter(x => x.estado=="LIBRE");
        const yaPagados = dataBoletos.filter(x => x.estado=="PAGADO");
        const yaApartados = dataBoletos.filter(x => x.estado=="APARTADO");
*/
        res.json(dataBoleto);
//Creo que estoy guardando en un "objeto" multiples colecciones de los boletos en su respectivo estado
        const reporteBoleto = {
            todos:dataBoleto,
            disponibles:noVendidos,
            apartados:yaApartados,
            pagados:yaPagados
        }
    
        res.status(201).json(reporteBoleto);    
    }
    else{
        res.status(401).json({message:"Recurso no encontrado"})
    }
})


module.exports = router;