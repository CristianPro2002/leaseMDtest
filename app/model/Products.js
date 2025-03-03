const { queryDatabase } = require("../../config/db");

const ProductsModel = {
  updateAccount: async (id, fields) => {
    const setClauses = [];
    const values = [];
  
    // Iteramos sobre las claves de 'fields' y las añadimos al SET
    let i = 1;
    for (const [key, value] of Object.entries(fields)) {
      setClauses.push(`${key} = $${i}`);
      values.push(value);
      i++;
    }
  
    // Añadir el ID al final de los valores
    values.push(id);
  
    // Unir las cláusulas SET para formar la parte de la consulta
    const setQuery = setClauses.join(", ");
  
    // Construir la consulta final
    const query = `
      UPDATE accounts
      SET ${setQuery}
      WHERE contact_id = $${i}
      RETURNING *;
    `;
  

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
