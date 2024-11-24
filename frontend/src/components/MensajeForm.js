import React from 'react';

const MensajeForm = ({ mensaje, setMensaje, handleSubmit, respuesta }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={mensaje}
        onChange={(event) => setMensaje(event.target.value)}
        placeholder="Ingrese un mensaje"
      />
      <button type="submit">Enviar</button>
      <p>Respuesta: {respuesta}</p>
    </form>
  );
};

export default MensajeForm;
