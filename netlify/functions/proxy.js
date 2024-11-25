const axios = require('axios');

exports.handler = async function (event) {
  try {
    // Solo permitir métodos POST y GET
    if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: 'Método no permitido'
      };
    }

    // Si la solicitud es POST (para la API de SambaNova)
    if (event.httpMethod === 'POST') {
      // Lee el cuerpo de la solicitud y los encabezados necesarios
      const body = JSON.parse(event.body);
      const API_URL = 'https://api.sambanova.ai/v1/chat/completions';
      const API_KEY = process.env.API_KEY;

      // Verificar que el cuerpo contiene el campo 'text'
      if (!body.text) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'El cuerpo de la solicitud debe contener el texto a procesar.' }),
        };
      }

      // Formatear correctamente el payload para la API de SambaNova
      const payload = {
        prompt: body.text,
        max_tokens: 150,  // Ajusta según tus necesidades
        temperature: 0.7,  // Ajusta según tus necesidades
      };

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    }

    // Si la solicitud es GET (para Firebase Storage)
    if (event.httpMethod === 'GET') {
      // Obtén la URL del archivo desde la consulta
      const { fileUrl } = event.queryStringParameters;
      if (!fileUrl) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'La URL del archivo es requerida' })
        };
      }

      // Hacer la solicitud a Firebase Storage
      const response = await axios.get(fileUrl, {
        responseType: 'stream', // Usamos stream para manejar archivos grandes
      });

      // Devuelve el archivo al frontend
      return {
        statusCode: 200,
        headers: {
          'Content-Type': response.headers['content-type'], // Propagamos el tipo de contenido
        },
        body: response.data,
      };
    }

  } catch (error) {
    console.error('Error en la función del proxy:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al procesar la solicitud', details: error.message }),
    };
  }
};
