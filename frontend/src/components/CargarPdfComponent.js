import React, { useState } from 'react';
import CargarPdfForm from './CargarPdfForm';

const CargarPdfComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const enviarPdf = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    const response = await fetch('http://localhost:3001/api/cargar-pdf', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <CargarPdfForm
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        handlePdfChange={handlePdfChange}
        enviarPdf={enviarPdf}
      />
    </div>
  );
};

export default CargarPdfComponent;

