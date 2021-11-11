const express = require('express');
const morgan = require("morgan");
const sorteo = require("./routes/sorteo");
const app = express();

//Middleware
app.use(morgan('dev'));
//Para entender y recibir formatos JSON
app.use(express.json());
//Entender datos desde inputs de formularios, datos sencillos.
app.use(express.urlencoded({extended: false}));

//rutas
app.use("/api/v1/sorteo",sorteo);

module.exports = app;