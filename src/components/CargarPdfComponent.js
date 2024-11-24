import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import CargarPdfForm from './CargarPdfForm';

const CargarPdfComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const enviarPdf = async (event) => {
    event.preventDefault();
    if (!pdfFile) {
      alert('Por favor, selecciona un archivo PDF para subir.');
      return;
    }
    setUploading(true);
    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    try {
      await uploadBytes(storageRef, pdfFile);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      alert('Archivo PDF subido exitosamente.');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un error al subir el archivo. Inténtalo de nuevo.');
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
