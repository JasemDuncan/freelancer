// const { Schema, SchemaTypeOptions } = require("mongoose")

const {Schema, model} = require("mongoose");


const ReciboSchema = Schema({
    titulo: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    moneda: {
        type: String,
        require: true
    },
    monto: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    tipoDocumento: {
        type: String,
        require: true
    },
    numeroDocumento: {
        type: String,
        require: true
    }
},{versionKey: false});

module.exports = model("Recibo",ReciboSchema, "recibos");