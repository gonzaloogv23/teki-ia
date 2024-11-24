import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import CargarPdfForm from './CargarPdfForm';

const CargarPdfComponent = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const enviarPdf = async (event) => {
    event.preventDefault();
    if (pdfFile) {
      const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pdfFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error('Error al subir el archivo:', error);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'pdfFiles'), {
            name: pdfFile.name,
            url: downloadURL,
            timestamp: new Date()
          });
          console.log('Archivo subido con éxito:', downloadURL);
          setPdfFile(null);
          setUploadProgress(0);
        }
      );
    }
  };

  return (
    <div>
      <CargarPdfForm
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        handlePdfChange={handlePdfChange}
        enviarPdf={enviarPdf}
      />
      {uploadProgress > 0 && <p>Progreso de subida: {uploadProgress}%</p>}
    </div>
  );
};

export default CargarPdfComponent;
