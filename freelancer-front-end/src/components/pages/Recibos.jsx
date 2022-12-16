import React from 'react'
import { useState, useEffect } from 'react'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Recibos = () => {

  const [recibos, setRecibos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirRecibos();
  }, []);

  const conseguirRecibos = async () => {

    const { datos, cargando } = await Peticion(Global.url + "recibos", "GET");

    if (datos.status === "success") {
      setRecibos(datos.recibos);
    }
    setCargando(false);

  };

  return (
    <>
      {cargando ? "Cargando..." :
        recibos.length >= 1 ?
          <Listado recibos={recibos} setRecibos={setRecibos} />
          : <h1>No hay recibos</h1>
      }
    </>
  )
}
