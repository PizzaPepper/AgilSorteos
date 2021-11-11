const {Router} = require('express');
const mongoose = require('mongoose');
const router = Router();
const sorteo = require('../model/Sorteo');

const sorteoSchema = new mongoose.Schema(sorteo);
const sorteoModel = mongoose.model('sorteo',sorteoSchema);



router.get('/', async (req,res)=>{
    const data = await sorteoModel.find();
    res.send(data);
});

const fooSchema = new mongoose.Schema({
    name:String,
    foo:Number
});

const fooModel = mongoose.model('foo',fooSchema);

router.get("/foo", async (req,res)=>{
    // const dato = new fooModel({
    //     name:req.body.name,
    //     foo:req.body.foo
    // });
    // await dato.save()
    const data = await fooModel.find();

    res.send(data);

});



module.exports = router;