require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const {
  validateName,
  validateQuantity,
  validateIfExists } = require('./controllers/validation/validationProducts');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Requisito 1 - Crie um endpoint para o cadastro de produtos

app.post(
  '/products',
  validateName,
  validateIfExists,
  validateQuantity,
  productsController.add,
);

// Requisito 2 - Crie um endpoint para listar os produtos

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
