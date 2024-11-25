import React, { useState } from 'react';
import SambanovaService from '../services/SambanovaService';
import * as pdfjsLib from 'pdfjs-dist/webpack';

// Configurar el worker para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const EnviarCuestionario = () => {
  const [cuestionario, setCuestionario] = useState(null);
  const [respuesta, setRespuesta] = useState(null);

  const handleSeleccionarCuestionario = (e) => {
    setCuestionario(e.target.files[0]);
    console.log("cuestionario: ", e.target.files[0]);
  };

  const handleEnviarCuestionario = async () => {
    if (cuestionario) {
      try {
        const textoExtraido = await extractTextFromPDF(cuestionario);
        const respuesta = await SambanovaService.enviarCuestionario(textoExtraido); // Asegúrate de enviar el texto extraído
        if (respuesta.error) {
          setRespuesta(respuesta.error);
        } else {
          setRespuesta(respuesta.message); // Acceder al mensaje de la respuesta transformada
        }
      } catch (error) {
        console.error("Error al enviar el cuestionario", error);
        setRespuesta("Error al enviar el cuestionario");
      }
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    // Cargar el documento PDF
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

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

  return (
    <div>
      <h2>Enviar Cuestionario</h2>
      <input type="file" onChange={handleSeleccionarCuestionario} />
      <button onClick={handleEnviarCuestionario}>Enviar cuestionario</button>
      {respuesta && <p>Respuesta: {respuesta}</p>}
    </div>
  );
};

export default EnviarCuestionario;
