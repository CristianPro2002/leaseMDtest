const { queryDatabase } = require("../../config/db");

const ProductsModel = {
  updateAccount: async (id, fields) => {
    const query = `
        UPDATE accounts
        SET created = $1
        WHERE contact_id = $2
        RETURNING *;
    `;
    const values = [fields.created, id];

    return await queryDatabase(query, values);
  },

  getAccountsFisica: async () => {
    const query = `SELECT * FROM accounts WHERE created = false AND type = 'fisica' LIMIT 80`;
    return await queryDatabase(query);
  },

  getAccountsMoral: async () => {
    const query = `SELECT * FROM accounts WHERE created = false AND type = 'moral' LIMIT 80`;
    return await queryDatabase(query);
  },
};

module.exports = ProductsModel;
