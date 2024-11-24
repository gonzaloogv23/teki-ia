import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import sambanovaService from '../services/SambanovaService';
import './estilosComponentes/chatbot.css';

const ChatComponent = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [primeraLlamada, setPrimeraLlamada] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const mensajesSnapshot = await getDocs(collection(db, 'mensajes'));
      const mensajesList = mensajesSnapshot.docs.map(doc => doc.data());
      setMensajes(mensajesList);
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await obtenerRespuesta(mensaje);
      const nuevoMensajeEnviado = { texto: mensaje, tipo: 'enviado', timestamp: serverTimestamp() };
      const nuevoMensajeRecibido = { texto: respuesta, tipo: 'recibido', timestamp: serverTimestamp() };

      await addDoc(collection(db, 'mensajes'), nuevoMensajeEnviado);
      await addDoc(collection(db, 'mensajes'), nuevoMensajeRecibido);

      setMensajes([...mensajes, nuevoMensajeEnviado, nuevoMensajeRecibido]);
    } catch (error) {
      console.error("Error al obtener la respuesta", error);
      const mensajeError = { texto: "Error al obtener la respuesta", tipo: 'recibido', timestamp: serverTimestamp() };
      setMensajes([...mensajes, { texto: mensaje, tipo: 'enviado', timestamp: serverTimestamp() }, mensajeError]);
      await addDoc(collection(db, 'mensajes'), mensajeError);
    }
    setMensaje('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const obtenerRespuesta = async (mensaje) => {
    let textoEnviar = mensaje;
    if (primeraLlamada) {
      textoEnviar = `Tu nombre es Teki, una llama joven que está aquí para ayudarte. ${mensaje}`;
      setPrimeraLlamada(false);
    }
    const respuesta = await sambanovaService.obtenerRespuesta(textoEnviar);
    return respuesta.message;
  };

  return (
    <div className="card">
      <div className="chat-header">Teki v1</div>
      <div className="chat-window">
        <ul className="message-list">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={mensaje.tipo === 'enviado' ? 'mensaje-enviado' : 'mensaje-recibido'}>
              {mensaje.texto}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          className="message-input"
          placeholder="Escribe tu mensaje aquí"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
