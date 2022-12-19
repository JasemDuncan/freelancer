import React from 'react';
import { useState } from 'react';
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';


export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarRecibo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoRecibo = formulario;

    //Guardar Recibo en el backend
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoRecibo);

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }


    //Subir la imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.recibo._id, "POST", formData, true);

      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
  };

  return (
    <div className='jumbo'>
      <h1>Crear recibo</h1>
      <p>Formulario </p>

      <strong>{resultado == "guardado" ? "Recibo guardado con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>
      {/* Mostrar formulario */}
      <form className='formulario' onSubmit={guardarRecibo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo*</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>

        {/* <div className='form-group'>
          <label htmlFor="logo">Logo</label>
          <input type="text" name="logo" onChange={cambiado} />
        </div> */}

        <div className='form-group'>
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="moneda">Moneda</label>
          <input type="text" name="moneda" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="monto">Monto</label>
          <input type="number" name="monto" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="descripcion">Descripcion*</label>
          <input type="text" name="descripcion" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="direccion">Direccion</label>
          <input type="text" name="direccion" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="tipoDocumento">tipodDocumento</label>
          <input type="text" name="tipoDocumento" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="numeroDocumento">NumeroDocumento</label>
          <input type="text" name="numeroDocumento" onChange={cambiado} />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
      {/* */}
    </div>
  )
}
