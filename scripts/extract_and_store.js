const fs = require('fs');
const pdf = require('pdf-parse');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname,'.','server', 'db', 'mi_base_de_datos.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err);
        // Crear la base de datos si no existe
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        const db = new sqlite3.Database(dbPath);
        db.run(`CREATE TABLE IF NOT EXISTS conocimiento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            de_contenido TEXT NOT NULL,
            fe_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});



const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

const storeKnowledgeInDatabase = (contenido) => {
    db.run('INSERT INTO conocimiento (de_contenido) VALUES (?)', [contenido], function(err) {
        if (err) {
            console.error('Error al insertar conocimiento en la base de datos', err);
        } else {
            console.log('Conocimiento almacenado con éxito');
        }
    });
};

// Procesar y almacenar contenido del PDF
const processAndStorePDF = async (filePath) => {
    try {
        const contenido = await extractTextFromPDF(filePath);
        storeKnowledgeInDatabase(contenido);
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
