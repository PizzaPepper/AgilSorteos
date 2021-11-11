const express = require('express');
const morgan = require("morgan");
const app = express();

//Middleware
app.use(morgan('dev'));
//Para entender y recibir formatos JSON
app.use(express.json());
//Entender datos desde inputs de formularios, datos sencillos.
app.use(express.urlencoded({extended: false}));

//Routing/rutas
app.use(require('./routes/sorteo'));

module.exports = app;