import React from 'react'
import './App.css'
import { Editar } from './Editar'
import { Mostrar } from './Mostrar'

function App() {
  const contacto = {
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '1234567890',
  }
  return (
    <>
      <div className="card">
        <Editar contacto={contacto} />
        <Mostrar contacto={contacto} />
      </div>
    </>
  )
}

export default App
