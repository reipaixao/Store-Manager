const connection = require('./connection');

const create = async (name, quantity) => {
  const [rows] = await connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?);',
  [name, quantity]);
  return { id: rows.insertId, name, quantity };
};

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (!rows) return null;
  return rows[0]; // Aula 23.1 - Introdução - Arquitetura de Software
};

const update = async (id, name, quantity) => {
  await connection.execute('UPDATE products SET name = ?, quantity = ? WHERE id=?',
  [name, quantity, id]);
  return { id, name, quantity };
};

const remove = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
