const db = require('./database_setup');

const storeKnowledgeInDatabase = (contenido) => {
    db.run('INSERT INTO conocimiento (de_contenido) VALUES (?)', [contenido], function(err) {
        if (err) {
            console.error('Error al insertar conocimiento en la base de datos', err);
        } else {
            console.log('Conocimiento almacenado con éxito');
        }
    });
};

module.exports = storeKnowledgeInDatabase;
