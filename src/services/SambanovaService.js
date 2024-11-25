import axios from 'axios';
import RespuestaTransformer from '../components/RespuestaTransformer';

// Reemplaza "YOUR_VERCEL_APP_NAME" con el dominio de tu aplicación en Vercel
const API_URL = 'https://api.sambanova.ai/v1/chat/completions';
const API_KEY = 'c0e0bd6c-cc82-441a-9404-b0350b54a684';
const MODEL = 'Meta-Llama-3.1-8B-Instruct';

const sambanovaService = {
  async obtenerRespuesta(mensaje) {
    const mensajes = [
      {
        role: 'system',
        content: 'You are a helpful assistant',
      },
      {
        role: 'user',
        content: mensaje,
      },
    ];

    try {
      const respuesta = await axios.post(API_URL, {
        stream: true,
        model: MODEL,
        messages: mensajes,
      }, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const respuestaTransformada = RespuestaTransformer.transformarRespuesta(respuesta);
      console.log("respuesta transformada", respuestaTransformada);
      return respuestaTransformada;
    } catch (error) {
      console.error("Error al obtener la respuesta", error);
      return "Error al obtener la respuesta";
    }
  },
};

export default sambanovaService;
