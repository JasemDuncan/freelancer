import React from 'react';
import {Link} from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido</h1>
      <p>Plataforma orientada a freelancers, que puedan crear recibos de manera rápida y sencilla. </p>
      <Link to="/recibos" className='button'>Ver los recibos</Link>
    </div>
  )
}
