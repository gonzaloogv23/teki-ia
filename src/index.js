import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // Si usas rutas, agregar Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Si usas React Router */}
      <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación
reportWebVitals();
