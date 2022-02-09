const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection
    .query(
      'INSERT INTO products (name, quantity) VALUES (?, ?);',
      [name, quantity],
    );
  
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const [response] = await connection
    .query('SELECT * FROM products');
    return response;
};

const getById = async (id) => {
  const [response] = await connection
    .query('SELECT * FROM products WHERE id = ?', [id]);
  if (!response.length) return null;
  return response[0];
};

module.exports = {
  add,
  getAll,
  getById,
};
