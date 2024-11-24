import React, { useState } from 'react';
import sambanovaService from '../services/SambanovaService';
import './estilosComponentes/chatbot.css';

const ChatComponent = () => {
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [primeraLlamada, setPrimeraLlamada] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const respuesta = await obtenerRespuesta(mensaje);
      console.log("respuesta de la api:", respuesta)
  
      if (respuesta) {
        setRespuesta(respuesta);
        setMensajes([...mensajes, { texto: mensaje, tipo: 'enviado' }, { texto: respuesta, tipo: 'recibido' }]);
      } else {
        setRespuesta("No se pudo obtener una respuesta adecuada.");
        setMensajes([...mensajes, { texto: mensaje, tipo: 'enviado' }, { texto: "No se pudo obtener una respuesta adecuada.", tipo: 'recibido' }]);
      }
    } catch (error) {
      console.error("Error al obtener la respuesta", error);
      setRespuesta("Error al obtener la respuesta");
      setMensajes([...mensajes, { texto: mensaje, tipo: 'enviado' }, { texto: "Error al obtener la respuesta", tipo: 'recibido' }]);
    }
    setMensaje('');
  };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const efectoPigmalion = (mensaje) => {

    if (mensaje.includes('gracias') || mensaje.includes('agradecido')) {
      return 'Me alegra que estés agradecido! ';
    } else if (mensaje.includes('problema') || mensaje.includes('error')) {
      return 'Lo siento, ¿en qué puedo ayudarte? ';
    } else {
      return '';
    }
  };

  const tipsRelacionarse = (mensaje) => {

    if (mensaje.includes('hola') || mensaje.includes('buenos días')) {
      return 'Recuerda que la primera impresión es importante. ¡Sonríe y sé amable! ';
    } else if (mensaje.includes('adiós') || mensaje.includes('hasta luego')) {
      return 'Recuerda que la despedida es tan importante como el saludo. ¡Sé educado y agradecido! ';
    } else {
      return '';
    }
  };

  const agregarEmojis = (mensaje) => {
    if (mensaje.includes('hola') || mensaje.includes('buenos días')) {
      return mensaje + ' 😊👋💛';
    } else if (mensaje.includes('gracias') || mensaje.includes('agradecido')) {
      return mensaje + ' 🙏💕😊';
    } else if (mensaje.includes('problema') || mensaje.includes('error')) {
      return mensaje + ' 🤔😬🚫';
    } else if (mensaje.includes('adiós') || mensaje.includes('hasta luego')) {
      return mensaje + ' 👋🚪👍';
    } else if (mensaje.includes('feliz') || mensaje.includes('alegre')) {
      return mensaje + ' 😊🎉🎊';
    } else if (mensaje.includes('triste') || mensaje.includes('sad')) {
      return mensaje + ' 😔😢🤕';
    } else if (mensaje.includes('enfadado') || mensaje.includes('enojado')) {
      return mensaje + ' 😠😡🔥';
    } else if (mensaje.includes('sorprendido') || mensaje.includes('asombrado')) {
      return mensaje + ' 😮😲🤯';
    } else if (mensaje.includes('amor') || mensaje.includes('amoroso')) {
      return mensaje + ' ❤️💕😘';
    } else if (mensaje.includes('cumpleaños') || mensaje.includes('feliz cumpleaños')) {
      return mensaje + ' 🎂🎁🎉';
    } else if (mensaje.includes('divertido') || mensaje.includes('entretenido')) {
      return mensaje + ' 😄🎉👍';
    } else if (mensaje.includes('aburrido') || mensaje.includes('desinteresado')) {
      return mensaje + ' 😒😴👎';
    } else if (mensaje.includes('emocionado') || mensaje.includes('entusiasmado')) {
      return mensaje + ' 😆🎉🔥';
    } else if (mensaje.includes('relajado') || mensaje.includes('tranquilo')) {
      return mensaje + ' 😌🌟👌';
    } else if (mensaje.includes('estresado') || mensaje.includes('ansioso')) {
      return mensaje + ' 😩😬🕰️';
    } else if (mensaje.includes('satisfecho') || mensaje.includes('contento')) {
      return mensaje + ' 😊👌💯';
    } else if (mensaje.includes('insatisfecho') || mensaje.includes('descontento')) {
      return mensaje + ' 😐😒👎';
    } else if (mensaje.includes('sorprendente') || mensaje.includes('increíble')) {
      return mensaje + ' 😮🤯🔥';
    } else if (mensaje.includes('normal') || mensaje.includes('común')) {
      return mensaje + ' 😐👌🔴';
    } else if (mensaje.includes('extraño') || mensaje.includes('raro')) {
      return mensaje + ' 😕🤔🔮';
    } else {
      return mensaje + ' '; 
    }
  };
  
  
  const obtenerRespuesta = async (mensaje) => {
    let textoEnviar = mensaje;
    if (primeraLlamada) {
      textoEnviar = `Tu nombre es Teki, una llama joven que está aquí para ayudarte. ${mensaje}`;
      setPrimeraLlamada(false);
    }
    const respuesta = await sambanovaService.obtenerRespuesta(textoEnviar);
    const efectoPigmalionTexto = efectoPigmalion(mensaje);
    const tipsRelacionarseTexto = tipsRelacionarse(mensaje);
    const respuestaConEmojis = agregarEmojis(`${efectoPigmalionTexto} ${respuesta.message} ${tipsRelacionarseTexto}`);
    return respuestaConEmojis;
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
