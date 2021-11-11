const {Router} = require('express');
const mongoose = require('Mongoose');
const router = Router();
const sorteo = require('../model/Sorteo');

const sorteoSchema = new mongoose.Schema(sorteo);
const sorteoModel = mongoose.model('sorteo',sorteoSchema);


router.get('/', async(req,res)=>{
    const data = await sorteoModel.find();
    console.log(data);
    res.send("Test mongoose");
});




module.exports = router;