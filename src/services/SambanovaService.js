import axios from 'axios';
import RespuestaTransformer from '../components/RespuestaTransformer';

// Reemplaza "YOUR_VERCEL_APP_NAME" con el dominio de tu aplicación en Netlify
const API_URL = 'https://cheerful-daifuku-56516d.netlify.app/.netlify/functions/proxy';
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

  async enviarCuestionario(cuestionario) {
    const readFileAsText = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(new Blob([file])); // Convertir a Blob si es necesario
      });
    };

    try {
      const textoCuestionario = await readFileAsText(cuestionario);
      console.log("Texto del cuestionario:", textoCuestionario);
      
      const payload = {
        text: textoCuestionario // Asegurarse de que el texto se envíe con la clave correcta
      };

      console.log("Payload a enviar:", JSON.stringify(payload));

      const respuesta = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      // Respuesta procesada
      const respuestaTransformada = RespuestaTransformer.transformarRespuesta(respuesta);
      console.log("Respuesta transformada:", respuestaTransformada);
      return { message: respuestaTransformada };
    } catch (error) {
      console.error("Error al enviar el cuestionario:", error.response || error.message || error);
      return { error: "Error al enviar el cuestionario" };
    }
  },
};

export default sambanovaService;
