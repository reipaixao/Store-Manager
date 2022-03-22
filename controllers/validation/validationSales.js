const productsService = require('../../services/productsServices');

const validateProduct = (req, res, next) => {
  if (!req.body.some((sale) => sale.product_id)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};

const validateSales = (req, res, next) => {
  if (req.body.some((sale) => sale.quantity <= 0)) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  if (!req.body.some(({ quantity }) => quantity && quantity !== 0)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (req.body.some(({ quantity }) => typeof quantity !== 'number')) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

const validateProductQuantity = async (req, res, next) => {
  const productsQuantity = req.body.map(
    async (product) => productsService.checkQuantity(product.product_id),
  );
  const products = await Promise.all(productsQuantity);

  if (products.some((quantity, index) => quantity <= req.body[index].quantity)) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  validateProduct,
  validateSales,
  validateProductQuantity,
};