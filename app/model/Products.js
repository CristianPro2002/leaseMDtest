const { queryDatabase } = require("../../config/db");


const ProductsModel = {
    
    addProduct: async ({ 
        originalDocument, 
        translatedDocument, 
        traslatorId, 
        statusId, 
        documentType, 
        targetLanguage, 
        sourceLanguage, 
        bepayReferenceId,
        fileName,
        sourceCountry,
        targetCountry
    }) => {
        const query = `
            INSERT INTO products (
                original_document,
                translated_document,
                translator_id,
                status_id,
                document_type,
                target_language,
                source_language,
                bepay_reference_id,
                file_name,
                source_country,
                target_country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const values = [
            originalDocument,
            translatedDocument,
            traslatorId,
            statusId,
            documentType,
            targetLanguage,
            sourceLanguage,
            bepayReferenceId,
            fileName,
            sourceCountry,
            targetCountry
        ];
        return await queryDatabase(query, values);
    },

    getAllProducts: async () => {
        const query = `SELECT * FROM products`;
        return await queryDatabase(query);
    },

    getProductById: async (id) => {
        const query = `SELECT * FROM products WHERE id = $1`;
        const values = [id];
        const result = await queryDatabase(query, values);
        return result.length > 0 ? result[0] : null;
    },

    getProductByBepayReferenceId: async (bepayReferenceId) => {
        const query = `SELECT * FROM products WHERE bepay_reference_id = $1`;
        const values = [bepayReferenceId];
        const result = await queryDatabase(query, values);
        return result.length > 0 ? result[0] : null;
    },

    updateProduct: async (id, fields) => {
        const keys = Object.keys(fields);
        const values = Object.values(fields);
        values.push(id);

        const setQuery = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
        const query = `UPDATE products SET ${setQuery} WHERE id = $${keys.length + 1} RETURNING *`;

        return await queryDatabase(query, values);
    },

    deleteProduct: async (id) => {
        const query = `DELETE FROM products WHERE id = $1 RETURNING *`;
        const values = [id];
        return await queryDatabase(query, values);
    },

    getAccounts: async () => {
        const query = `SELECT * FROM accounts`;
        return await queryDatabase(query);
    },

};

module.exports = ProductsModel;