const fs = require('fs');
const pdf = require('pdf-parse');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
const path = require('path');

// Importar la configuración de Firebase
const firebaseConfig = require('./firebaseConfig');

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

const storeKnowledgeInDatabase = async (contenido) => {
    try {
        await addDoc(collection(db, 'conocimiento'), {
            de_contenido: contenido,
            fe_timestamp: serverTimestamp()
        });
        console.log('Conocimiento almacenado con éxito en Firestore');
    } catch (error) {
        console.error('Error al insertar conocimiento en Firestore', error);
    }
};

// Procesar y almacenar contenido del PDF
const processAndStorePDF = async (filePath) => {
    try {
        const contenido = await extractTextFromPDF(filePath);
        await storeKnowledgeInDatabase(contenido);
    } catch (error) {
        console.error('Error al procesar y almacenar el PDF', error);
    }
};

const dataPath = path.resolve(__dirname, '..', 'data');

fs.readdir(dataPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        if (path.extname(file) === '.pdf') {
            const filePath = path.join(dataPath, file);
            processAndStorePDF(filePath);
        }
    });
});
