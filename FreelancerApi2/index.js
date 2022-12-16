const {conexion} = require("./basedatos/conexion")
const express = require("express")
const cors = require("cors")

//Inicializar app
console.log("jasem valencia555");

//Conectar a la base de datos
conexion();

//Crear  servidor node
const app = express();
const puerto= 3900;
//Configurar cors
app.use(cors());

//Convertir body a objecto js
app.use(express.json()); //Recibir datos con content-type app/json
app.use(express.urlencoded( {extended: true})); // express decodifica cuando en psotman usas x-www-form-urlencoded

//Crear RUTAS
const rutas_recibo = require("./rutas/recibo");
//Cargo las rutas
app.use("/api", rutas_recibo);

//Rutas de pruebas HARDCORE
app.get("/probando", (req, res)=>{
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).json(
       {
            curso: "master en react",
            autor: "jasem valencia"
       }
    
    );
});

//Crear servidor y escuchar peticiones http
app.listen(puerto, () =>{
    console.log("Servidor corriendo en el puerto"+puerto);
});