import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';
import CargarPdfForm from './CargarPdfForm';
import { PDFDocument } from 'pdf-lib';

const CargarPdfComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let extractedText = '';
    for (const page of pages) {
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map(item => item.str).join(' ');
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

      // Hacer una solicitud a la función de proxy en Netlify
      const response = await axios.post('/.netlify/functions/proxy', {
        text: extractedText
      });
      console.log('Respuesta de la función de proxy:', response.data);

      // Verificar respuesta y almacenar en Firestore
      await addDoc(collection(db, 'conocimiento'), {
        de_contenido: response.data,
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
