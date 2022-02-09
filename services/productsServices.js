const productsModel = require('../models/productsModel');

const add = async ({ name, quantity }) => productsModel.add(name, quantity);

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

module.exports = {
  add,
  getAll,
  getById,

};
