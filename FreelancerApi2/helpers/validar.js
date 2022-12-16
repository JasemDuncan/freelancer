const validator = require("validator");

const validarRecibo = (parametros)=>{
    
    let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                          validator.isLength(parametros.titulo, {min: 5, max: undefined});
    let validar_descripcion = !validator.isEmpty(parametros.descripcion);

    if(!validar_titulo || !validar_descripcion){
        throw new Error("No se ha validado la informacion!")
    }
};

module.exports= {
    validarRecibo
}