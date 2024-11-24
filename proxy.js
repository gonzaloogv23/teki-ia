const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 next();
});

app.options('*', (req, res) => {
 res.status(200).send();
});

const apiProxy = createProxyMiddleware({
 target: 'https://api.sambanova.ai/v1',
 changeOrigin: true,
 pathRewrite: { '^/v1': '' },
});

app.use('/v1', apiProxy);

app.listen(3002, () => {
 console.log('Proxy escuchando en el puerto 3002');
});