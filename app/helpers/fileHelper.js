const fileHelper = {
    decodeBase64: (base64String) => Buffer.from(base64String, 'base64'),
    isPDF: (fileName) => fileName.toLowerCase().endsWith('.pdf'),
    isPDFOrWord: (fileName) => {
        const lowerCaseName = fileName.toLowerCase();
        return lowerCaseName.endsWith('.pdf') || lowerCaseName.endsWith('.doc') || lowerCaseName.endsWith('.docx');
    },
    addTranslatedPrefix: (fileName) => {
        const fileParts = fileName.split('.');
        const extension = fileParts.pop();
        const baseName = fileParts.join('.'); 
        return `translated_${baseName}.${extension}`;
    },
    arrayToBuffer: (array) => Buffer.from(array),

};

module.exports = fileHelper;