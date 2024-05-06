import React from 'react';
import './App.css';

const contactos = [
  { id: 1, nombre: 'Ledesma', apellido: 'Facundo', tel: '3813839933' },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', tel: '3813839933'},
  { id: 3, nombre: 'Flor', apellido: 'Chazarreta', tel: '3813839933' },
];

const Contacto = ({ contacto: { nombre, apellido,tel } }) => (
  <li>
    {nombre} <b>{apellido}</b><b>{tel}</b>
  </li>
);

const Agenda = ({ contactos }) => (
  <ul>
    {contactos.map(c => (
      <Contacto key={c.id} contacto={c} />
    ))}
  </ul>
);

function App() {
  return (
    <div className="App">
      <h1>Agenda con React</h1>
      <Agenda contactos={contactos} />
    </div>
  );
}

export default App;

