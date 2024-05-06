import React from "react";
import "./App.css";

const contactos = [
  { id: 1, nombre: "Ledesma", apellido: "Facundo", tel: "3813839933" },
  { id: 2, nombre: "Ana", apellido: "Gómez", tel: "3813839933" },
  { id: 3, nombre: "Flor", apellido: "Chazarreta", tel: "3813839933" },
];

const Contacto = ({ contacto: { id, nombre, apellido, tel } }) => (
  <li className="card">
    <div className="card__content">
      <span className="card__id">ID: {id}</span>
      <span className="card__name">
        {nombre} {apellido}
      </span>
      <span className="card__tel">{tel}</span>
    </div>
  </li>
);

const Agenda = ({ contactos }) => (
  <ul>
    {contactos.map((c) => (
      <Contacto key={c.id} contacto={c} />
    ))}
  </ul>
);

function App() {
  return (
    <div className="titulo">
      <h1>Agenda con React</h1>
      <div className="App">
        <Agenda contactos={contactos} />
      </div>
    </div>
  );
}

export default App;
