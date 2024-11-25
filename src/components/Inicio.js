import React from 'react';
import './estilosComponentes/inicio.css';
import logo from '../assets/teki.png';
import llama2 from '../assets/llama2.png';
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
        Hola, soy Teki !   <img src={llama2} alt="Teki" />
        </button>
        <div className="tarjetas-precios">
          <div className="tarjeta-precio">
            <div className="tarjeta-precio-content">
              <p className="tarjeta-precio-plan">FREE</p>
              <div className="tarjeta-precio-valor">
                <p className="tarjeta-precio-numero"> $0/mes</p> 

                
              </div>
              <div className="tarjeta-precio-nota">

              <ul>
                    <li>ChatBot</li>
                    <li>Cuestionario</li>
                    <li>Herramientas didáctica</li>
                    <li>Puedes entrenar a Teki</li>
              </ul>


              </div>

            </div>
          </div>
          <div className="tarjeta-precio">
            <div className="tarjeta-precio-content">
              <p className="tarjeta-precio-plan">PREMIUM</p>
              <div className="tarjeta-precio-valor">
                <p className="tarjeta-precio-numero">$9.99/mes </p>
               
              </div>
              <div className="tarjeta-precio-nota">
              <ul>
                    <li>Puedes entrenar a Teki</li>
                    <li>ChatBot personalizado</li>
                    <li>Seguimiento personalizado</li>
                    <li>Herramientas didáctica premium</li>
              </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
