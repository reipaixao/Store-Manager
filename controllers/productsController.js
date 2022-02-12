const rescue = require('express-rescue');
const productsService = require('../services/productsServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.create({ name, quantity });

  return res.status(201).json(newProduct);
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = rescue(async (req, res) => {
  const product = await productsService.getById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = await productsService.update({ id, name, quantity });

  return res.status(200).json(updatedProduct);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
  
  await productsService.remove(id);
  res.status(200).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};