const connection = require('./connection');

const create = async (sales) => {
  const [row] = await connection.query('INSERT INTO sales (date) VALUES (NOW())');
  const salesProducts = sales.map(async ({ product_id: productId, quantity }) => {
    await connection.query(
      'INSERT INTO sales_products (sale_id, product_id, quantity)VALUES (?, ?, ?)',
      [row.insertId, productId, quantity],
    );
  });
  await Promise.all(salesProducts);

  return row;
};

module.exports = {
  create,
};