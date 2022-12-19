import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';


export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [recibo, setRecibo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirRecibo();
  }, []);


  const conseguirRecibo = async () => {

    const { datos } = await Peticion(Global.url + "recibo/" + params.id, "GET");

    if (datos.status === "success") {
      setRecibo(datos.recibo);
    }

  };

  const editarRecibo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoRecibo = formulario;

    //Guardar Recibo en el backend
    const { datos } = await Peticion(Global.url + "recibo/"+params.id, "PUT", nuevoRecibo);

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
      <h1>Editar Recibo</h1>
      <p>Formulario para editar : {recibo.titulo} </p>

      <strong>{resultado == "guardado" ? "Recibo guardado con exito" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>
      {/* Mostrar formulario */}
      <form className='formulario' onSubmit={editarRecibo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={recibo.titulo} />
        </div>

        {/* <div className='form-group'>
          <label htmlFor="logo">Logo</label>
          <input type="text" name="logo" onChange={cambiado} defaultValue={recibo.logo} />
        </div> */}

        <div className='form-group'>
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {recibo.logo != "default.png" && <img src={Global.url + "imagen/" + recibo.logo} />}
            {!recibo.logo == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png" />}
          </div>
          <input type="file" name="file0" id="file" onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="moneda">Moneda</label>
          <input type="text" name="moneda" onChange={cambiado} defaultValue={recibo.moneda} />
        </div>

        <div className='form-group'>
          <label htmlFor="monto">Monto</label>
          <input type="number" name="monto" onChange={cambiado} defaultValue={recibo.monto} />
        </div>

        <div className='form-group'>
          <label htmlFor="descripcion">Descripcion</label>
          <input type="text" name="descripcion" onChange={cambiado} defaultValue={recibo.descripcion} />
        </div>

        <div className='form-group'>
          <label htmlFor="direccion">Direccion</label>
          <input type="text" name="direccion" onChange={cambiado} defaultValue={recibo.direccion} />
        </div>

        <div className='form-group'>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" onChange={cambiado} defaultValue={recibo.nombre} />
        </div>

        <div className='form-group'>
          <label htmlFor="tipoDocumento">tipodDocumento</label>
          <input type="text" name="tipoDocumento" onChange={cambiado} defaultValue={recibo.tipoDocumento} />
        </div>

        <div className='form-group'>
          <label htmlFor="numeroDocumento">NumeroDocumento</label>
          <input type="text" name="numeroDocumento" onChange={cambiado} defaultValue={recibo.numeroDocumento} />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
      {/* */}
    </div>
  )
}
