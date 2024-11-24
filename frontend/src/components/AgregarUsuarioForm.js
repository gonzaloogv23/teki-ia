import React from 'react';

const AgregarUsuarioForm = ({ nombre, setNombre, edad, setEdad, agregarUsuario }) => {
  return (
    <form onSubmit={agregarUsuario}>
      <input
        type="text"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
        placeholder="Nombre"
      />
      <input
        type="number"
        value={edad}
        onChange={(event) => setEdad(event.target.value)}
        placeholder="Edad"
      />
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default AgregarUsuarioForm;
