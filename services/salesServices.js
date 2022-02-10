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

module.exports = {
  create,
  getAllSales,
  getAllSalesById,
};
