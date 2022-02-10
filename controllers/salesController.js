const rescue = require('express-rescue');
const salesService = require('../services/salesServices');

const create = rescue(async (req, res) => {
  const newSale = await salesService.create(req.body);

  return res.status(201).json({ id: newSale.insertId, itemsSold: req.body });
});

module.exports = {
  create,
};
