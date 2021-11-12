const {Router} = require('express');
const mongoose = require('mongoose');

// Desactivar Pluralizador
mongoose.pluralize(null);

const sorteoModel = require('../model/Sorteo');
const boletoModel = require('../model/Boleto');

const router = Router();


router.get('/lista', async (req,res)=>{
    const data = await sorteoModel.find();
    res.json(data);
});

router.get('/lista/:id', async (req,res)=>{
    const id = req.params.id;
    const dataSorteo = await sorteoModel.findOne({_id:id});

    if(dataSorteo!=null){
        const dataBoletos = await boletoModel.find({"sorteo.$id":id});
        
        const totales = (dataSorteo.rangoDeNumeros.get('hasta') - dataSorteo.rangoDeNumeros.get('desde'))+1
        const disponibles = dataBoletos.filter(x=>x.estado=="LIBRE").length;
        const pagados = dataBoletos.filter(x=>x.estado=="PAGADO").length;
        const apartados = dataBoletos.filter(x=>x.estado=="APARTADO").length;
        
        const sorteo = {
            sorteo: dataSorteo.nombre,
            dineroActual: dataSorteo.precioDeNumeros*pagados,
            dineroMeta: dataSorteo.precioDeNumeros*totales,
            fechaDeCreacion: dataSorteo.fechaDeCreacion,
            fechaDeSorteo:dataSorteo.fechaDeSorteo,
            totales: totales,
            disponibles:disponibles,
            pagados:pagados,
            apartados:apartados
        }
    
        res.status(201).json(dataSorteo);
    }else{
        res.status(401).json({message:"Recurso no encontrado"})
    }
});






module.exports = router;