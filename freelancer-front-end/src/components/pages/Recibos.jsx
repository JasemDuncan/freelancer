import React from 'react'
import { useState, useEffect } from 'react'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

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
        (
          recibos.length >= 1 ?
            (
              recibos.map(recibo => {
                return (
                  <article key={recibo._id} className="recibo-item">
                    <div className='mascara'>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png" />
                    </div>
                    <div className="datos">
                      <h3 className="title">{recibo.titulo}</h3>
                      <p className="description">jasemduncan.com</p>
                      <button className="edit">Editar</button>
                      <button className="delete">Borrar</button>
                    </div>
                  </article>
                );
              })
            )
            :
            (
              <h1>No hay recibos</h1>
            )
        )
      }

    </>
  )
}
