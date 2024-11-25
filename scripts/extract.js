const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

module.exports = extractTextFromPDF;
