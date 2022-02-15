const salesModel = require('../models/salesModel');
const productsServices = require('./productsServices');
// const validate = require('../controllers/validation/validationProducts');

const create = async (sales) => {
  const createSale = salesModel.create(sales);
  return createSale;
};

const getAllSales = async () => {
  const products = await salesModel.getAll();
  return products;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

// Consulta ao PR #59
const updateQuantity = async (sales) => {
  const update = sales.map(async (sale) => {
    const { product_id: id, quantity: saleQuantity } = sale;

    const product = await productsServices.getById(id);
    product.quantity -= saleQuantity;

    await productsServices.update(product);
  });
  return update;
};

// const getById = async (id) => {
//   const sale = await salesModel.getById2(id);

//   return sale;
// };

const update = async ({ product_id: id, quantity }) => {
  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

const remove = async (id) => {
  if (!id) return null;
  const [sale] = await getById(id);

  const product = await productsServices.getById(sale.product_id);
  product.quantity += sale.quantity;

  const removedSale = await salesModel.remove(id);

  await productsServices.update(product);

  return removedSale;
};

module.exports = {
  create,
  getAllSales,
  getById,
  update,
  remove,
  updateQuantity,
};
