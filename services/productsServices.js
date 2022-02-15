const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => productsModel.create(name, quantity);

const getAll = async () => productsModel.getAll();

// const getById = async (id) => {
//   const product = await productsModel.getById(id);
//   return product;
// };

const getById = async (id) => productsModel.getById(id);

const update = async ({ id, name, quantity }) => {
  await getById(id);
  const updatedProduct = await productsModel.update(id, name, quantity);
  return updatedProduct;
};

const checkQuantity = async (id) => {
  const product = await getById(id);

  return product.quantity;
};

const remove = async (id) => productsModel.remove(id);

module.exports = {
  create,
  getAll,
  getById,
  update,
  checkQuantity,
  remove,
};
