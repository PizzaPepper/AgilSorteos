const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
const DB = process.env.DATABASE;


// Inicializa la base de datos
mongoose.connect(DB).then(con=>{
    console.log('Correctly connected to the DB');
})
.catch(err=>{
    console.log(err);
});

// Levanto el servidor
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,()=>{
    console.log(`App runnnig on port ${PORT}...`);
});



