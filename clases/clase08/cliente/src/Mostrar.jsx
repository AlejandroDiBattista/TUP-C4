import React from 'react';
import { Tarjeta } from './Tarjeta';

export function Mostrar({ contacto }) {
  return (
    <Tarjeta>
      <p className="nombre">{contacto.nombre} <b> {contacto.apellido}</b></p>
      <p>Teléfono: {contacto.telefono}</p>
    </Tarjeta>
  );

}
