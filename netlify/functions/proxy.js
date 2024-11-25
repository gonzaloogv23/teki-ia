const axios = require('axios');

exports.handler = async function (event) {
  try {
    // Solo permitir métodos POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Método no permitido',
      };
    }

    // Lee el cuerpo de la solicitud y los encabezados necesarios
    const body = JSON.parse(event.body);
    const API_URL = 'https://api.sambanova.ai/v1/chat/completions';
    const API_KEY = process.env.API_KEY;

    const response = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
    } catch (error) {
      console.error('Error en la función del proxy:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Error en el proxy',
          details: error.message,
          stack: error.stack,
        }),
      };
    }
};