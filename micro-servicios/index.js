const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const DB = process.env.DATABASE;


// Inicializa la base de datos
mongoose.connect(DB).then(con=>{
    console.log('Se conecto correctamente a la BD');
})
.catch(err=>{
    console.log(err);
});

// Levanto el servidor
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,()=>{
    console.log(`App corriendo en el puerto: ${PORT}...`);
});



