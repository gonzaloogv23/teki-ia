const axios = require('axios');

exports.handler = async function (event) {
  try {
    // Solo permitir métodos POST y GET
    if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: 'Método no permitido',
      };
    }

    // Si la solicitud es POST (para la API de SambaNova)
    if (event.httpMethod === 'POST') {
      // Lee el cuerpo de la solicitud y los encabezados necesarios
      const body = JSON.parse(event.body);
      const API_URL = 'https://api.sambanova.ai/v1/chat/completions';
      const API_KEY = process.env.API_KEY; // Se espera que tengas tu clave API configurada en las variables de entorno de Netlify

      // Si el cuerpo no tiene datos relevantes, responder con un error
      if (!body || !body.text) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'El cuerpo de la solicitud debe contener el texto a procesar.' }),
        };
      }

      // Solicitud a la API de SambaNova
      const response = await axios.post(API_URL, {
        prompt: body.text, // Asegúrate de usar el campo correcto según lo esperado por la API
        max_tokens: 150,
        temperature: 0.7
      }, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      // Retornar los datos procesados desde SambaNova
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    }

    // Si la solicitud es GET (para obtener un archivo desde Firebase Storage)
    if (event.httpMethod === 'GET') {
      // Obtén la URL del archivo desde los parámetros de la consulta
      const { fileUrl } = event.queryStringParameters;
      if (!fileUrl) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'La URL del archivo es requerida' }),
        };
      }

      // Solicitar el archivo desde Firebase Storage
      const response = await axios.get(fileUrl, {
        responseType: 'stream', // Usamos stream para manejar archivos grandes
      });

      // Devuelve el archivo al frontend con el tipo de contenido correcto
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

    // Manejo de errores con información adicional
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al procesar la solicitud',
        details: error.message,
      }),
    };
  }
};
