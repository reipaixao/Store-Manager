const rescue = require('express-rescue');
const salesService = require('../services/salesServices');
// const salesModels = require('../models/salesModel');

const create = rescue(async (req, res) => {
  const newSale = await salesService.create(req.body);

  return res.status(201).json({
    id: newSale.insertId,
    itemsSold: req.body,
  });
});

const getAll = async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
};

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);

  if (!sales) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sales);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const [product] = req.body;

  const sales = await salesService.getById(id);

  if (!sales) return res.status(404).json({ message: 'Sale not found' });

  await salesService.update(product);

  res.status(200).json({ saleId: id, itemUpdated: req.body });
});

const remove2 = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  await salesService.remove(id);

  res.status(200).json(sale);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove2,
};
