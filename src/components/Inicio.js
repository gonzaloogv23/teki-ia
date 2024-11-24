import React from 'react';
import './estilosComponentes/inicio.css';
import logo from '../assets/teki.png';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <div className="card">
      
      <div className="card__img">
         <img src={logo} alt="Mascota del proyecto" />
      </div>

      <div className="card-int">
        <p className="card-int__title">Teki v1</p>
        <p className="excerpt"> La herramienta digital que revoluciona la educación con soluciones pedagógicas personalizadas para cada tipo de aprendizaje.</p>
        <button className="card-int__button" onClick={handleClick}>
        Hola! ¿necesitas ayuda?
        </button>
      </div>
    </div>
  );
};

export default Inicio;
