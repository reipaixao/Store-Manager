require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const {
  validateName,
  validateQuantity,
  validateIfExists } = require('./controllers/validation/validationProducts');

const { validateProduct, validateSales, validateProductQuantity,
} = require('./controllers/validation/validationSales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

// Requisito 1 - Crie um endpoint para o cadastro de produtos

app.post('/products', validateName, validateIfExists, validateQuantity, productsController.update);

// Requisito 2 - Crie um endpoint para listar os produtos

app.get('/products/:id', productsController.getById);
app.get('/products', productsController.getAll);

// Requisito 3 - Crie um endpoint para atualizar um produto

app.put('/products/:id', validateName, validateQuantity, productsController.update);

// Requisito 4 - Crie um endpoint para deletar um produto

app.delete('/products/:id', productsController.remove);

// Requisito 5 - Crie um endpoint para cadastrar vendas

app.post('/sales', validateProduct, validateSales, validateProductQuantity, salesController.create);

// Requisito 6 - Crie um endpoint para listar as vendas

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

// Requisito 7 - Crie um endpoint para atualizar uma venda

app.put(
'/sales/:id',
validateProduct,
validateSales,
validateProductQuantity,
salesController.update,
);

// Requisito 10 - Crie um endpoint para deletar uma venda

app.delete('/sales/:id', salesController.remove2);

// Requisito 11 - Atualize a quantidade de produtos

app.put(
'/sales/:id', 
validateProduct, 
validateSales, 
validateProductQuantity, 
salesController.update,
);
