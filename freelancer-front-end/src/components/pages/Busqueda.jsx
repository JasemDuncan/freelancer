import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { Listado } from './Listado';

export const Busqueda = () => {

  const [recibos, setRecibos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params=useParams();

  useEffect(() => {
    conseguirRecibos();
  }, [params]);

  useEffect(() => {
    conseguirRecibos();
  }, []);

  const conseguirRecibos = async () => {

    const { datos, cargando } = await Peticion(Global.url + "buscar/"+params.busqueda, "GET");

    if (datos.status === "success") {
      setRecibos(datos.recibos);
    }else[
        setRecibos([])
    ]

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
