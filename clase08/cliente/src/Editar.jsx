import React, { useState } from 'react';
import { Campo } from './Campo';
import { Tarjeta } from './Tarjeta';

export function Editar(contacto, alAceptar, alCancelar) {
  let [nombre, setNombre] = useState(contacto.nombre);
  let [apellido, setApellido] = useState(contacto.apellido);
  let [telefono, setTelefono] = useState(contacto.telefono);

  const cambiarNombre = (e) => {
    setNombre(e.target.value);
  };

  const cambiarApellido = (e) => {
    setApellido(e.target.value);
  };

  const cambiarTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const aceptar = (e) => {
    e.preventDefault();
    alAceptar({...contacto, nombre, apellido, telefono });
  }

  const cancelar = (e) => {
    e.preventDefault();
    alCancelar();
  }

  return (
    <form>
      <Tarjeta>
        <Campo label={'Nombre'}
          valor={nombre} cambiar={cambiarNombre} />
        <Campo label={'Apellido'}
          valor={apellido} cambiar={cambiarApellido} />
        <Campo label={'Teléfono'}
          valor={telefono} cambiar={cambiarTelefono} />

        <div className="acciones">
          <button onClick={aceptar}>Aceptar</button>
          <button onClick={cancelar}>Cancelar</button>
        </div>
      </Tarjeta>
    </form>
  );
}
