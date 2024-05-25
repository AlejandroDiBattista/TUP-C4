import React from 'react'
import './App.css'
import { Editar } from './Editar'
import { Mostrar } from './Mostrar'
import { Contador } from './Contador'

function App() {
  const contacto = {
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '1234567890',
  }

  const traer = () => {
    console.log('Traer')
  }

  function traer() {
    console.log(fetch("https://jsonplaceholder.typicode.com/users"));
  }
  return (
    <>
      <button onClick={traer}>Traer</button>
      <Contador />
      <Editar contacto={contacto} />
      <Mostrar contacto={contacto} />
    </>
  )
}

export default App
