import React from 'react'
import { Link } from 'react-router-dom';
import {Global} from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Listado = ({ recibos, setRecibos }) => {

  const eliminar = async(id) =>{
    let {datos}= await Peticion(Global.url+"recibo/"+id, "DELETE");
    
    if(datos.status === "success"){
      let recibosActualizados = recibos.filter(recibo => recibo._id !==id)
      setRecibos(recibosActualizados);
    }

  };

  return (
    recibos.map(recibo => {
      return (
        <article key={recibo._id} className="recibo-item">
          <div className='mascara'>
            {recibo.logo != "default.png" && <img src={Global.url + "imagen/" +recibo.logo}/>}
            {!recibo.logo == "default.png" && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1280px-Unofficial_JavaScript_logo_2.svg.png" />}
          </div>
          <div className="datos">
            <h3 className="title"><Link to={"/recibo/"+recibo._id}>{recibo.titulo}</Link></h3>
            <p className="description">jasemduncan.com</p>
            <button className="edit">Editar</button>
            <button className="delete" onClick={()=>{
              eliminar(recibo._id)
            }}>Borrar</button>
          </div>
        </article>
      );
    })
  )
}
