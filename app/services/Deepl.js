const axios = require('axios');
const FormData = require('form-data');
const { fileHelper } = require('../helpers');
require('dotenv').config();

const translateDocumentDeepl = async (payload) => {
    const { DEEPL_API_KEY, DEEPL_API_URL } = process.env;
    const { fileBase64, fileName, source_lang, target_lang } = payload;
    console.log( DEEPL_API_KEY, DEEPL_API_URL );

    if (!DEEPL_API_KEY || !DEEPL_API_URL) {
        throw new Error("Faltan configuraciones de la API de DeepL.");
    }

    try {
        const fileBuffer = fileHelper.decodeBase64(fileBase64);

        // Crear FormData
        const formData = new FormData();
        formData.append("auth_key", DEEPL_API_KEY);
        formData.append("target_lang", target_lang.toUpperCase());
        formData.append("source_lang", source_lang.toUpperCase());
        formData.append("file", fileBuffer, fileName);

        // Subir el archivo
        const uploadResponse = await axios.post(DEEPL_API_URL, formData, {
            headers: formData.getHeaders(),
        });

        const { document_id, document_key } = uploadResponse.data;

        // Comprobar estado de traducción
        const statusUrl = `${DEEPL_API_URL}/${document_id}`;
        let status;
        do {
            const statusResponse = await axios.get(statusUrl, {
                params: { auth_key: DEEPL_API_KEY, document_key },
            });
            status = statusResponse.data.status;

            if (status === "error") {
                throw new Error("Falló la traducción del documento.");
            }

            // Esperar antes de reintentar
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } while (status !== "done");

        // Descargar archivo traducido
        const resultResponse = await axios.get(
            `${DEEPL_API_URL}/${document_id}/result`,
            {
                params: { auth_key: DEEPL_API_KEY, document_key },
                responseType: "arraybuffer",
            }
        );

        return resultResponse.data;
    } catch (error) {
        console.error("Error durante la traducción con DeepL:", error.message);
        throw new Error(error.message || "Error en la traducción.");
    }
};


module.exports = {
    translateDocumentDeepl
}