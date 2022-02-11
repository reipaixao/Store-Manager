const salesModel = require('../models/salesModel');

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

const update = async ({ product_id: id, quantity }) => {
  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

module.exports = {
  create,
  getAllSales,
  getAllSalesById,
  update,
};
