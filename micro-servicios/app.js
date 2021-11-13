const express = require('express');
const morgan = require("morgan");
const sorteo = require("./routes/sorteo");
const cors=require("cors");
const app = express();
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

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

//rutas
app.use("/api/v1/sorteos",sorteo);

module.exports = app;