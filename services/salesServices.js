const salesModel = require('../models/salesModel');

const create = async (sales) => {
  const createSale = salesModel.create(sales);
  return createSale;
};

module.exports = {
  create,
};
