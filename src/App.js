import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import ChatComponent from './components/ChatComponent';
import UsuariosComponent from './components/UsuariosComponent';
import CargarPdfComponent from './components/CargarPdfComponent';


const App = () => {
    return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/usuarios" element={<UsuariosComponent />} />
          <Route path="/cargar-pdf" element={<CargarPdfComponent />} />
        </Routes>

        <Navbar />
      </BrowserRouter>
    );
  };

export default App;
