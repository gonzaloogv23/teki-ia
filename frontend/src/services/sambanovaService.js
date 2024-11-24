import axios from 'axios';
import RespuestaTransformer from '../components/RespuestaTransformer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const API_KEY = '7b915d72-308a-4578-b5a1-2925985fa5ec';
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
      const respuesta = await axios.post(`https://api.sambanova.ai/v1/chat/completions`, {
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

      // Almacenar la respuesta en Firestore
      await addDoc(collection(db, 'conversaciones'), {
        mensaje,
        respuesta: respuestaTransformada,
        timestamp: new Date()
      });

      return respuestaTransformada;
    } catch (error) {
      console.error("Error al obtener la respuesta", error);
      return "Error al obtener la respuesta";
    }
  },
};

export default sambanovaService;
