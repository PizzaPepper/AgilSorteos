/**
 * * app.js
 * Archivo js con la finalidad de configurar el framwework express
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

/*Se importan los diversos modulos que se utilizarán para la aplicación.*/
 //Módulo express para servidor
const express = require('express');
//Middleware para interceptar las peticiones.
const morgan = require("morgan");
//Módulo routing de sorteo.
const sorteo = require("./routes/sorteo"); 
//Módulo routing de número
const numero = require("./routes/numero");
//Módulo routing de cliente
const cliente = require("./routes/cliente");
//Intercambio de recursos cruzado, realmente es un modulo para permisos.
const cors = require("cors");
//Se inicializa una constante llamada app para guardar los servicios de express
const app = express(); 

//Se configura el certificado
const corsOptions = {
  origin:"*",
  Credential:true,
  optionSuccessStatus:200,
} 

//Middleware
app.use(morgan('dev'));
//Para entender y recibir formatos JSON
app.use(express.json());
//Entender datos desde inputs de formularios, datos sencillos.
app.use(express.urlencoded({extended: false}));
//Credenciales basicos para las peticiones
app.use(cors(corsOptions));

//Petición get de la página "principal".
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

//rutas
app.use("/api/v1/sorteos",sorteo);
app.use("/api/v1/reporte/numeros",numero);
app.use("/api/v1/reporte/clientes", cliente);


//Exportación del módulo.
module.exports = app;