const express= require("express")
const multer = require("multer");
const ReciboControlador = require("../controladores/recibo");

const router=express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './imagenes/recibos/');
    },
    filename: (req, file, cb)=> {
        cb(null, "recibo" + Date.now() +file.originalname);
    }
});

const subidas = multer({storage: almacenamiento});



//Rutas de prueba
router.get("/ruta-de-prueba",ReciboControlador.prueba);
router.get("/recibo", ReciboControlador.recibo);

//Ruta util
router.post("/crear", ReciboControlador.crear);

router.get("/recibos/:ultimos?",ReciboControlador.listar);
router.get("/recibo/:id",ReciboControlador.uno);
router.delete("/recibo/:id",ReciboControlador.borrar);
router.put("/recibo/:id",ReciboControlador.editar);
router.post("/subir-imagen/:id",[subidas.single("file0")],ReciboControlador.subir);
router.get("/imagen/:fichero",ReciboControlador.imagen);
router.get("/buscar/:busqueda",ReciboControlador.buscar);

module.exports = router;