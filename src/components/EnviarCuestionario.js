import React, { useState, useRef } from 'react';
import SambanovaService from '../services/SambanovaService';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import './estilosComponentes/cargarpdf.css';

// Configurar el worker para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const EnviarCuestionario = () => {
  const [cuestionario, setCuestionario] = useState(null);
  const [respuesta, setRespuesta] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const fileInputRef = useRef(null);

  const handleSeleccionarCuestionario = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCuestionario(file);
      console.log("Cuestionario seleccionado: ", file);
    } else {
      alert("Por favor seleccione un archivo PDF.");
    }
  };

  const handleEnviarCuestionario = async () => {
    if (cuestionario) {
      try {
        const respuestaApi = await enviarCuestionario(cuestionario);
        console.log("Respuesta de la API:", respuestaApi);

        if (typeof respuestaApi === 'string') {
          setRespuesta(respuestaApi.split('\n'));
          setMensajes([...mensajes, { texto: 'Cuestionario enviado', tipo: 'enviado' }, { texto: respuestaApi, tipo: 'recibido' }]);
        } else {
          setRespuesta(["No se pudo obtener una respuesta adecuada."]);
          setMensajes([...mensajes, { texto: 'Cuestionario enviado', tipo: 'enviado' }, { texto: "No se pudo obtener una respuesta adecuada.", tipo: 'recibido' }]);
        }
      } catch (error) {
        console.error("Error al enviar el cuestionario", error);
        setRespuesta(["Error al enviar el cuestionario"]);
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
      const textoEnviar = `Que me podes evaluar de esto. ${textoCuestionario}`;
      const respuesta = await SambanovaService.enviarCuestionario(textoEnviar);
      console.log("Respuesta transformada:", respuesta); // Verificación adicional

      if (respuesta && respuesta.message) {
        return respuesta.message; // Asegúrate de que `respuesta` tenga el formato esperado
      } else {
        throw new Error("Respuesta inválida");
      }
    } catch (error) {
      console.error("Error al enviar el cuestionario", error);
      return "Error al enviar el cuestionario";
    }
  };

  return (
    <div>
      <h2>Enviar Cuestionario</h2>
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handleSeleccionarCuestionario} 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
      />
      <button 
        className="upload-area" 
        onClick={() => fileInputRef.current.click()}
      >
        <span className="upload-area-icon">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="35" height="35" viewBox="0 0 340.531 419.116">
            <g id="files-new" clipPath="url(#clip-files-new)">
              <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)"></path>
            </g>
          </svg>
        </span>
        <span className="upload-area-title">Seleccione un archivo PDF</span>
        <span className="upload-area-description">O arrastre y suelte un archivo PDF aquí</span>
      </button>
      <br/>
      <button onClick={handleEnviarCuestionario} className='btn btn-primary'>Enviar cuestionario</button>
      {respuesta.length > 0 && (
        <div>
          {respuesta.map((linea, index) => (
            <p key={index}>{linea}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnviarCuestionario;
