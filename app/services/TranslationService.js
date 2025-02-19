const axios = require('axios');
require('dotenv').config();
const BaseUrl = process.env.BASE_URL_DOCS_TRANSLATION_API;

const getTranslationFile = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/translate-document-pay`, data, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el archivo de traducción: ${error.message}`);
    }
}

module.exports = {
    getTranslationFile
}