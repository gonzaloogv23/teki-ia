import React, { useState, useEffect } from 'react';
import AgregarUsuarioForm from './AgregarUsuarioForm';
import UsuariosList from './UsuariosList';
import CrearCuestionario from './CrearCuestionario';
import './estilosComponentes/usuarioscomponentes.css';

const UsuariosComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const agregarUsuario = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, edad }),
    });
    const data = await response.json();
    console.log('Usuario agregado:', data);
    obtenerUsuarios();
  };

  const obtenerUsuarios = async () => {
    const response = await fetch('http://localhost:3001/api/usuarios');
    const data = await response.json();
    setUsuarios(data.usuarios);
    console.log(data);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="usuarios-component">
      <div className="usuarios-component-int">

        <AgregarUsuarioForm
          nombre={nombre}
          setNombre={setNombre}
          edad={edad}
          setEdad={setEdad}
          agregarUsuario={agregarUsuario}
        />
        <CrearCuestionario />
        <UsuariosList usuarios={usuarios} />
      </div>
    </div>
  );
};

export default UsuariosComponent;
