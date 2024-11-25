import React, { useState } from 'react';
import SambanovaService from '../services/SambanovaService';
import * as pdfjsLib from 'pdfjs-dist/webpack';

// Configurar el worker para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const EnviarCuestionario = () => {
  const [cuestionario, setCuestionario] = useState(null);
  const [respuesta, setRespuesta] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const handleSeleccionarCuestionario = (e) => {
    setCuestionario(e.target.files[0]);
    console.log("cuestionario: ", e.target.files[0]);
  };

  const handleEnviarCuestionario = async () => {
    if (cuestionario) {
      try {
        const respuestaApi = await enviarCuestionario(cuestionario);
        console.log("Respuesta de la API:", respuestaApi);

        if (respuestaApi) {
          setRespuesta(respuestaApi);
          setMensajes([...mensajes, { texto: 'Cuestionario enviado', tipo: 'enviado' }, { texto: respuestaApi, tipo: 'recibido' }]);
        } else {
          setRespuesta("No se pudo obtener una respuesta adecuada.");
          setMensajes([...mensajes, { texto: 'Cuestionario enviado', tipo: 'enviado' }, { texto: "No se pudo obtener una respuesta adecuada.", tipo: 'recibido' }]);
        }
      } catch (error) {
        console.error("Error al enviar el cuestionario", error);
        setRespuesta("Error al enviar el cuestionario");
        setMensajes([...mensajes, { texto: 'Cuestionario enviado', tipo: 'enviado' }, { texto: "Error al enviar el cuestionario", tipo: 'recibido' }]);
      }
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    // Cargar el documento PDF
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    let extractedText = '';

    // Recorrer las páginas del PDF
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1); // las páginas se indexan desde 1

      // Obtener el contenido de la página
      const content = await page.getTextContent();

      // Extraer el texto de los items
      const pageText = content.items.map(item => item.str).join(' ');
      extractedText += pageText + '\n'; // Añadir un salto de línea entre páginas
    }

    return extractedText;
  };

  const enviarCuestionario = async (cuestionario) => {
    try {
      const textoCuestionario = await extractTextFromPDF(cuestionario);
      const respuesta = await SambanovaService.enviarCuestionario(textoCuestionario);
      return respuesta.message; // Asegúrate de que `respuesta` tenga el formato esperado
    } catch (error) {
      console.error("Error al enviar el cuestionario", error);
      return "Error al enviar el cuestionario";
    }
  };

  return (
    <div>
      <h2>Enviar Cuestionario</h2>
      <input type="file" onChange={handleSeleccionarCuestionario} />
      <button onClick={handleEnviarCuestionario}>Enviar cuestionario</button>
      <div className="chat-window">
        <ul className="message-list">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={mensaje.tipo === 'enviado' ? 'mensaje-enviado' : 'mensaje-recibido'}>
              {mensaje.texto}
            </li>
          ))}
        </ul>
      </div>
      {respuesta && <p>Respuesta: {respuesta}</p>}
    </div>
  );
};

export default EnviarCuestionario;
