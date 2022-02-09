const rescue = require('express-rescue');
const productService = require('../services/productsServices');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.add({ name, quantity });

  return res.status(201).json(newProduct);
};

const getAll = rescue(async (_req, res) => {
  const products = await productService.getAll();
  return res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
});

module.exports = {
  add,
  getAll,
  getById,
  
};