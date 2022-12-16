const fs= require("fs");
const path = require("path");
const {validarRecibo} = require("../helpers/validar");
const Recibo = require("../modelos/Recibo");

const res = require("express/lib/response");
const { restart } = require("nodemon");

const prueba = (req, res)=> {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba del controlador Recibo"
    });
}

const recibo = (req, res)=>{
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).json(
       {
            curso: "master en react",
            autor: "jasem valencia"
       }
    
    );
};

const crear = (req,res) => {

    //Recoger los parametros por post a guardar
    let parametros = req.body;    

    //Validar datos
    try{
        validarRecibo(parametros);
    }catch(error){        
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //Crear el objeto a guardar
        //const recibo = new Recibo(); //Manual
    const recibo = new Recibo(parametros);//Automaticamente

    //Asignar valores a objecto basado en el modelo(manul, automatico)
        //recibo.titulo = parametros.titulo; //Manualmente
    //Automaticamente no se hace nada de frente guardar

    //Guardar el articulo en la base de datos
    recibo.save((error, reciboGuardado)=>{
        if(error || !reciboGuardado){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el recibo"
            });            
        }

        //Devolver resultado
        return res.status(200).json({
            status: "success",
            recibo: reciboGuardado,
            mensaje: "Recibo creado con exito!"
        })
    });    
};

const listar = (req,res)=>{
    let consulta = Recibo.find({});
    if(req.params.ultimos){
        consulta.limit(3);
    }    

    consulta.sort({titulo: -1})
                         .exec((error, recibos)=>{
        if(error || !recibos){
            return res.status(404).json({
                status: "error",
                mensaje: "No se  han encontrado recibos"
            });
        }
        return res.status(200).send({
            status: "success",            
            contador: recibos.length,
            recibos
        });
    });
};

const uno = (req, res)=>{
    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo
    Recibo.findById(id, (error, recibo) => {
        //Sino existe devolver error
        if(error || !recibo){
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el recibo"
            });
        }            
        //Devolver resultado
        return res.status(200).json({
            status: "success",
            recibo
        });
    });    
};

const borrar = (req, res) => {
    let reciboId= req.params.id;

    Recibo.findOneAndDelete({_id: reciboId},(error, reciboBorrado)=>{
        if(error || !reciboBorrado){
            return res.status(500).json({
                status: "error",                
                mensaje: "Error al borrar un recibo"
            });
        }

        return res.status(500).json({
            status: "success",
            recibo: reciboBorrado,
            mensaje: "Metodo de borrar"
        });
    });
};



const editar = (req, res)=>{
    //Recoger id recibo a editar
    let reciboId = req.params.id;

    //Recoger datos del body
    let parametros = req.body;

    //Validar datos
    try{
        validarRecibo(parametros);
    }catch(error){        
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //Buscar y actualizar articulo
    Recibo.findOneAndUpdate({_id: reciboId}, parametros,{new: true}, (error, reciboActualizado)=>{
        if(error || !reciboActualizado){
            return res.status(500).json({
                status: "error",
                mensaje: reciboActualizado
            })
        }
        //Devolver respuesta
        return res.status(200).json({
            status: "success",
            recibo: reciboActualizado
        })

    });

    //Devolver respuesta
};

const subir = (req, res)=>{
    //Configurar multer para subir el archivo

    //Regoer el fichero de imagen subido
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida"
        });
    }

    //Nombre del archivo
    let archivo = req.file.originalname;

    //extension del archivo
    let archivo_split= archivo.split("\.");
    let extension = archivo_split[1];

    //Comprobar extension correcta
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension !="gif"){
        //Borrar archivo y dar respuesta
        fs.unlink(req.file.path,(error)=>{
            return res.status(400).json({
                status: "error",
                mensaje: "Archivo invalido"
            });
        });
    }else{
        
        //Recoger id recibo a editar
        let reciboId = req.params.id;

        //Buscar y actualizar articulo
        Recibo.findOneAndUpdate({_id: reciboId}, {logo: req.file.filename},{new:true}, (error, reciboActualizado)=>{
            if(error || !reciboActualizado){
                return res.status(500).json({
                    status: "error",
                    mensaje: reciboActualizado
                })
            }
            //Devolver respuesta
            return res.status(200).json({
                status: "success",
                recibo: reciboActualizado,
                fichero: req.file
            })
        });
    }
};

const imagen = (req, res)=>{
    let fichero = req.params.fichero;
    let ruta_fisica =  "./imagenes/recibos/"+fichero;

    fs.stat(ruta_fisica,(error,existe)=>{
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            });
        }
    });

};

const buscar = (req,res)=>{
    //sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //Find OR
    Recibo.find({"$or" :[
        {"titulo": {"$regex": busqueda, "$options": "i"}},
        {"descripcion": {"$regex": busqueda, "$options": "i"}},
    ]})
    .sort({titulo: -1})
    .exec((error, recibosEncontrados)=>{
        if(error || !recibosEncontrados || recibosEncontrados.length<=0){
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado recibos"
            })
        }

        return res.status(200).json({
            status: "success",
            recibos: recibosEncontrados
        })
    })

    //Orden

    //Ejecutar consulta

    //Devolver Resultado
};

module.exports={
    prueba,
    recibo,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscar
}
