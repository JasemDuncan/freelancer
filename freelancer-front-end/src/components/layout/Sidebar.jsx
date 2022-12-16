import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Global } from '../../helpers/Global';

export const Sidebar = () => {
  const [buscar, setBuscar]=useState("");
  const navegar=useNavigate();

  const hacerBusqueda = (e)=>{
    e.preventDefault();
    let mi_busqueda=e.target.search_field.value;
    navegar("/buscar/"+mi_busqueda,{replace: true});

  }


  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={hacerBusqueda}>
          <input type="text" name="search_field" />
          <input type="submit" id="search" value="Buscar"/>
        </form>
      </div>

      {/* <div className="add">
        <h3 className="title">Anadir peliculas</h3>
        <form>
          <input type="text" aria-placeholder="Titulo" />
          <textarea placeholder="Descripcion"></textarea>
          <input type="submit" value="Guardar" />
        </form>
      </div> */}
    </aside>
  )
}
