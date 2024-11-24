import React from 'react';
import './estilosComponentes/agregarusuario.css';

const AgregarUsuarioForm = ({ nombre, setNombre, edad, setEdad, agregarUsuario }) => {
  return (
    <form className="formulario-horizontal" onSubmit={agregarUsuario}>
      <div className="formulario-cabecera">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
        </svg>
        <h1 className="formulario-titulo">Agregar Usuario</h1>
      </div>
      <div className="formulario-campo">
        <label className="formulario-etiqueta" htmlFor="nombre">Nombre</label>
        <input
          className="formulario-input"
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="Nombre"
          id="nombre"
        />
      </div>
      <div className="formulario-campo">
        <label className="formulario-etiqueta" htmlFor="edad">Edad</label>
        <input
          className="formulario-input"
          type="number"
          value={edad}
          onChange={(event) => setEdad(event.target.value)}
          placeholder="Edad"
          id="edad"
        />
      </div>
      <div className="formulario-campo">
        <button className="formulario-boton" type="submit">Agregar Usuario</button>
      </div>
    </form>
  );
};

export default AgregarUsuarioForm;
