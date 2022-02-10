const rescue = require('express-rescue');
const salesService = require('../services/salesServices');

const create = rescue(async (req, res) => {
  const newSale = await salesService.create(req.body);

  return res.status(201).json({ id: newSale.insertId, itemsSold: req.body });
});

const getAll = rescue(async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getAllSalesById(id);

  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sales);
});

module.exports = {
  create,
  getAll,
  getById,
};
