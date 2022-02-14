const salesModel = require('../models/salesModel');
const productsServices = require('./productsServices');
// const validate = require('../controllers/validation/validationProducts');

const create = async (sales) => {
  const createSale = salesModel.create(sales);
  return createSale;
};

const getAllSales = async () => {
  const products = await salesModel.getAllSales();
  return products;
};

const getAllSalesById = async (id) => {
  const sale = await salesModel.getAllSales(id);
  return sale;
};

const getById = async (id) => {
  const sale = await salesModel.getById2(id);

  return sale;
};

const update = async ({ product_id: id, quantity }) => {
  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

const removeSale = async (id) => {
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
  getAllSalesById,
  update,
  removeSale,
  getById,
};
