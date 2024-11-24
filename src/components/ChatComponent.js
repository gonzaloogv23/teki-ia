import React, { useState } from 'react';
import sambanovaService from '../services/SambanovaService';
import MensajeForm from './MensajeForm';

const ChatComponent = () => {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const respuestaApi = await sambanovaService.obtenerRespuesta(mensaje);
      console.log("respuesta de la api:", respuestaApi);

      if (respuestaApi && respuestaApi.message) {
        setRespuesta(respuestaApi.message);
      } else {
        setRespuesta("No se pudo obtener una respuesta adecuada.");
      }
    } catch (error) {
      console.error("Error al obtener la respuesta", error);
      setRespuesta("Error al obtener la respuesta");
    }
  };

  return (
    <div>
      <MensajeForm
        mensaje={mensaje}
        setMensaje={setMensaje}
        handleSubmit={handleSubmit}
        respuesta={respuesta}
      />
    </div>
  );
};

export default ChatComponent;
