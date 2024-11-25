import React, { useState } from 'react';
import SambanovaService from '../services/SambanovaService';

const EnviarCuestionario = () => {
  const [cuestionario, setCuestionario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);

  const handleEnviarCuestionario = async () => {
    if (cuestionario) {
      try {
        const respuesta = await SambanovaService.enviarCuestionario(cuestionario);
        if (respuesta.error) {
          setRespuesta(respuesta.error);
        } else {
          setRespuesta(respuesta);
        }
      } catch (error) {
        console.error("Error al enviar el cuestionario", error);
        setRespuesta("Error al enviar el cuestionario");
      }
    }
  };
  
  const handleSeleccionarCuestionario = (e) => {
    setCuestionario(e.target.files[0]);
  };

  return (
    <div>
      <h2>Enviar Cuestionario</h2>
      <input type="file" onChange={handleSeleccionarCuestionario} />
      <button onClick={handleEnviarCuestionario}>Enviar cuestionario</button>
      {respuesta && <p>Respuesta: {respuesta}</p>}
    </div>
  );
};

export default EnviarCuestionario;
