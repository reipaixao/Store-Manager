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

const getAllSales = async (id) => {
  if (id) {
    const [row] = await connection.execute(
        `SELECT s.date AS date,
        sp.product_id AS product_id, sp.quantity AS quantity
        FROM sales_products AS sp INNER JOIN sales AS s ON s.id = sp.sale_id
        WHERE sp.sale_id = ?;`, [id],
    );
    return row;
  }

  const [row] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date AS date,
    sp.product_id AS product_id, sp.quantity AS quantity
    FROM sales_products AS sp INNER JOIN sales AS s ON s.id = sp.sale_id;`,
  );
  return row;
};

const update = async (id, quantity) => {
  await connection.execute('UPDATE sales_products SET quantity = ? WHERE product_id = ?',
    [quantity, id]);
};

const removeSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

const getById2 = async ({ id }) => {
  const [row] = await connection.execute(
    `
    SELECT s.date AS date,
    sp.product_id AS product_id,
    sp.quantity AS quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    `,
    [id],
  );
  if (!row.length) return null;
  return row;
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?', [id],
  );
};

module.exports = {
  create,
  getAllSales,
  update,
  removeSale,
  getById2,
  remove,
};
