const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://api.sambanova.ai/v1/chat/completions', req.body, {
      headers: {
        Authorization: `Bearer YOUR_API_KEY`,
        'Content-Type': 'application/json',
      },
    });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: 'Error en la solicitud a SambaNova' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
