import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';
import CargarPdfForm from './CargarPdfForm';
import * as pdfjsLib from 'pdfjs-dist/webpack'; // Asegúrate de importar desde webpack

// Configurar el worker para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const CargarPdfComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
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

  const enviarPdf = async (event) => {
    event.preventDefault();
    if (!pdfFile) {
      alert('Por favor, selecciona un archivo PDF para subir.');
      return;
    }
    setUploading(true);
    console.log('Subiendo archivo a Firebase Storage...');
    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    try {
      await uploadBytes(storageRef, pdfFile);
      console.log('Archivo subido a Firebase Storage.');
      
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      console.log('URL de descarga obtenida:', url);

      const extractedText = await extractTextFromPDF(pdfFile);
      console.log('Texto extraído del PDF:', extractedText);

      // Almacenar texto en Firestore
      await addDoc(collection(db, 'conocimiento'), {
        de_contenido: extractedText,
        fe_timestamp: new Date()
      });
      console.log('Texto almacenado en Firestore.');

      alert('Archivo PDF subido y procesado exitosamente.');
    } catch (error) {
      console.error('Error al subir y procesar el archivo:', error);
      alert('Hubo un error al subir y procesar el archivo. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <CargarPdfForm
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        handlePdfChange={handlePdfChange}
        enviarPdf={enviarPdf}
        uploading={uploading}
      />
      {downloadURL && <p>Archivo disponible en: <a href={downloadURL} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>}
    </div>
  );
};

export default CargarPdfComponent;
