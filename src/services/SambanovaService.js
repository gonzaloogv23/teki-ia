import axios from 'axios';
import RespuestaTransformer from '../components/RespuestaTransformer';

// Reemplaza "YOUR_VERCEL_APP_NAME" con el dominio de tu aplicación en Netlify
const API_URL = 'https://teki-ia.netlify.app/.netlify/functions/proxy';
const API_KEY = 'e08b7f0c-6d8e-46f3-8442-4cb459cd82ca';
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
      return { message: "Error al obtener la respuesta" };
    }
  },

  async enviarCuestionario(cuestionario) {
    try {
      const mensajes = [
        {
          role: 'system',
          content: 'You are a helpful assistant',
        },
        {
          role: 'user',
          content: cuestionario,
        },
      ];

      const payload = {
        stream: true,
        model: MODEL,
        messages: mensajes,
      };

      console.log("Payload a enviar:", JSON.stringify(payload));

      const respuesta = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const respuestaTransformada = RespuestaTransformer.transformarRespuesta(respuesta);
      console.log("Respuesta transformada:", respuestaTransformada);
      return respuestaTransformada;
    } catch (error) {
      console.error("Error al enviar el cuestionario", error);
      return { message: "Error al enviar el cuestionario" };
    }
  },
};

export default sambanovaService;
