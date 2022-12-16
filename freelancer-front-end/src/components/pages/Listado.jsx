import React from 'react'
import {Global} from '../../helpers/Global';

export const Listado = ({ recibos, setRecibos }) => {
  return (
    recibos.map(recibo => {
      return (
        <article key={recibo._id} className="recibo-item">
          <div className='mascara'>
            {recibo.logo != "default.png" && <img src={Global.url + "imagen/" +recibo.logo}/>}
            {!recibo.logo == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png" />}
          </div>
          <div className="datos">
            <h3 className="title">{recibo.titulo}</h3>
            <p className="description">jasemduncan.com</p>
            <button className="edit">Editar</button>
            <button className="delete" onClick={()=>{
              eliminar(articulo)
            }}>Borrar</button>
          </div>
        </article>
      );
    })
  )
}
