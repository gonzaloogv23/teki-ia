const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

const API_KEY = '768338a2-5014-491b-bdb4-bc9cc2b755fd';

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const apiProxy = createProxyMiddleware({
  target: 'https://api.sambanova.ai/v1',
  changeOrigin: true,
  pathRewrite: { '^/v1': '' },
  onProxyReq: (proxyReq, req, res) => {
    // Añadir cabecera de autorización para la solicitud saliente
    proxyReq.setHeader('Authorization', `Bearer ${API_KEY}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Ajustar cabeceras de CORS en la respuesta de la API
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Algo salió mal en el proxy' });
  }
});

app.use('/v1', apiProxy);

app.use('/firebase', createProxyMiddleware({
  target: 'https://firestore.googleapis.com',
  changeOrigin: true,
  pathRewrite: { '^/firebase': '' },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Algo salió mal en el proxy de Firebase' });
  }
}));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Proxy escuchando en el puerto ${port}`);
});
