import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Inicio } from './components/pages/Inicio'
import { Recibos } from './components/pages/Recibos'
import { Crear } from './components/pages/Crear'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Recibos</h1>
      <Inicio></Inicio>
      <Recibos></Recibos>
      <Crear></Crear>
    </div>
  )
}

export default App
