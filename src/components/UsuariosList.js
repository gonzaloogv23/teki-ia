import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './estilosComponentes/usuariolist.css';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
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

    obtenerUsuarios();
  }, []);

  return (
    <div className="usuarios-list-container">
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="usuario-card">
          <div className="usuario-info">
            <div className="usuario-avatar">
              <svg width="20" height="20" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path>
              </svg>
            </div>
            <div className="usuario-title">{usuario.nombre}</div>
            <div className="usuario-social">
        
    
              <div class="cuestionario-container">
                <div class="cuestionario-skill-box">
                  <span class="cuestionario-title">LENGUAJE</span>

                  <div class="cuestionario-skill-bar">
                    <span class="cuestionario-skill-per txt">
                      <span class="cuestionario-tooltip">70%</span>
                    </span>
                  </div>
                </div>

                <div class="cuestionario-skill-box">
                  <span class="cuestionario-title">MATEMATICAS</span>

                  <div class="cuestionario-skill-bar">
                    <span class="cuestionario-skill-per pdf">
                      <span class="cuestionario-tooltip">80%</span>
                    </span>
                  </div>
                </div>

                <div class="cuestionario-skill-box">
                  <span class="cuestionario-title">LECTURA COMPRENSIVA</span>

                  <div class="cuestionario-skill-bar">
                    <span class="cuestionario-skill-per pdf">
                      <span class="cuestionario-tooltip">80%</span>
                    </span>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsuariosList;
