import React from 'react';

const CargarPdfForm = ({ pdfFile, setPdfFile, handlePdfChange, enviarPdf }) => {
  return (
    <form onSubmit={enviarPdf}>
      <input
        type="file"
        accept=".pdf"
        onChange={handlePdfChange}
      />
      <button type="submit">Enviar PDF</button>
    </form>
  );
};

export default CargarPdfForm;
