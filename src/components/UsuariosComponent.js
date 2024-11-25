import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AgregarUsuarioForm from './AgregarUsuarioForm';
import UsuariosList from './UsuariosList';
import CrearCuestionario from './CrearCuestionario';
import './estilosComponentes/usuarioscomponentes.css';
import EnviarCuestionario from './EnviarCuestionario';

const UsuariosComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [mostrarLista, setMostrarLista] = useState(false);

  const agregarUsuario = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'usuarios'), { nombre, edad });
      console.log('Usuario agregado:', { nombre, edad });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const usuariosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsuarios(usuariosData);
      console.log('Usuarios obtenidos:', usuariosData);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  };

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
        <EnviarCuestionario />
        <button className="btn-toggle-lista" onClick={toggleLista}>
          {mostrarLista ? 'Esconder lista de alumnos' : 'Mostrar lista de alumnos'}
        </button>
        {mostrarLista && <UsuariosList usuarios={usuarios} />}
      </div>
    </div>
  );
};

export default UsuariosComponent;
