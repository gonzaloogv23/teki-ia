import React from 'react';

const UsuariosList = ({ usuarios }) => {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          <div>
            <p>Nombre: {usuario.nombre}</p>
            <p>Edad: {usuario.edad}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsuariosList;
