import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de tener este archivo configurado con los detalles de Firebase

const UsuariosComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  // Función para obtener usuarios desde Firestore
  const obtenerUsuarios = async () => {
    try {
      const usuariosSnapshot = await getDocs(collection(db, 'usuarios'));
      const usuariosList = usuariosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsuarios(usuariosList);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  // Función para agregar un usuario a Firestore
  const agregarUsuario = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'usuarios'), { nombre, edad });
      obtenerUsuarios();
      setNombre('');
      setEdad('');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Función para eliminar un usuario de Firestore
  const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para actualizar un usuario en Firestore
  const actualizarUsuario = async (id, nuevoNombre, nuevaEdad) => {
    try {
      await updateDoc(doc(db, 'usuarios', id), { nombre: nuevoNombre, edad: nuevaEdad });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div>
      <form onSubmit={agregarUsuario}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
        />
        <button type="submit">Agregar Usuario</button>
      </form>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.edad}
            <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
            <button onClick={() => actualizarUsuario(usuario.id, 'NuevoNombre', 25)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosComponent;
