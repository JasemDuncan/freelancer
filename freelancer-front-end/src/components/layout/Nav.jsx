import React from 'react';
import {NavLink} from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/inicio">Inicio</NavLink></li>
        <li><NavLink to="/recibos">Recibos</NavLink></li>
        <li><NavLink to="/crear-recibos">Crear Recibos</NavLink></li>
        <li><NavLink to="#">Contacto</NavLink></li>
      </ul>
    </nav>
  )
}
