import React from 'react';

export function Campo({ label, valor, cambiar }) {
  return (
    <>
      <label>{label}: </label>
      <input type="text"
        value={valor}
        onChange={cambiar} />
    </>
  );
}
