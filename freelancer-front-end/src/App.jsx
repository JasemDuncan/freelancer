import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Inicio } from './components/pages/Inicio'
import { Recibos } from './components/pages/Recibos'
import { Crear } from './components/pages/Crear'
import { Rutas } from './routing/rutas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="layout">
      <Rutas/>
    </div>
  )
}

export default App
