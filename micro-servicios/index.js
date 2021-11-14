/**
 * index.js
 * Archivo js con la finalidad de ser el archivo principal de la aplicación
 *Fecha: 13 - 11 - 2021
 * @author: "La comunidad del anillo"
 */

/**Se importan los módulos/dependencias enecesarias.*/
// Para la gestión de las base de datos no relacionales MongoDB
const mongoose = require('mongoose');
//Para la configuración de las variables de entorno/"globales"
const dotenv = require('dotenv');
/**Configuraciones/ / constantes que se utilizarán.*/
//Se establece la ruta del archivo de donde se obtendran las variables de entorno o "globales"
dotenv.config({path: './config.env'}); 
//Se importa el modulo app donde se encuentra la configuración del rounting
const app = require('./app');
//Se guarda la ruta de la Base de datos en una constante mediante una de las variables de entorno o "globales".
const DB = process.env.DATABASE;


/**Se realiza la conexión a la base de datos*/
mongoose.connect(DB).then(con=>{
    console.log('Se conecto correctamente a la BD');
})
.catch(err=>{
    console.log(err);
});

/**
 * Se almacena en una constante el valor del puerto obtenido mediante una variable global.
 */
const PORT = process.env.PORT || 3000;

/**
 * Se inicializa el servidor mediante el puerto previamente configurado.
 */
const server = app.listen(PORT,()=>{
    console.log(`App corriendo en el puerto: ${PORT}...`);
});



