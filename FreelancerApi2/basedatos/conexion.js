const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const conexion = async() => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/dbFreelancer"
        // ,{
        //      useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // }
        );
        console.log("Conectado correctamente a la base de datos de dbFreelancer");

        //Parametros dentro de objeto
        //useNewURLParser: true
        //useUnifiedTopoLogy: true
        //useCreateIndex: true

    }catch(error){ 
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}