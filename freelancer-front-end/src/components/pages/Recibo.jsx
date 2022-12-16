import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Recibo = () => {

  const [recibo, setRecibo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  
  useEffect(() => {
    conseguirRecibo();
  }, []);

  const conseguirRecibo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "recibo/" + params.id, "GET");

    if (datos.status === "success") {
      setRecibo(datos.recibo);
    }

    setCargando(false);
  };

  return (
    <div className="jumbo">
      {cargando ? "Cargando..." :
        <>
          <div className="mascara">
            {recibo.logo != "default.png" && <img src={Global.url + "imagen/" + recibo.logo} />}
            {!recibo.logo == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png" />}
          </div>
          <h1>{recibo.titulo}</h1>
          <span>{recibo.nombre}</span>
          <p>{recibo.descripcion}</p>
        </>
      }
    </div>
  )
}
