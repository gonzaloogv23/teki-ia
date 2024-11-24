// En el componente UsuariosList
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilosComponentes/usuariolist.css';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setUsuarios(response.data.usuarios);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="usuarios-list-container">
      {usuarios.map(usuario => (
        <div key={usuario.id} className="usuario-card">
          <div className="usuario-info">
            <div className="usuario-avatar">
            <svg width="20" height="20" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path>
            </svg>

            </div>
            <div className="usuario-title">{usuario.nombre}</div>
            
            <div className="usuario-social">
              <li id="cs1" className="usuario-social-icon">
              <svg width="15" height="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>

                Twitter
              </li>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsuariosList;
