const sinon = require('sinon');
const { expect } = require('chai');
// const connection = require('../../models/connection');
const productsService = require('../../services/productsServices');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const salesService = require ('../../services/salesServices');

// Usando código da aula 23.4 como modelo:
// https://github.com/tryber/sd-014-c-live-lectures/blob/lecture/23.4/movies-api/tests/models/movies/getAllModel.test.js

describe('Busca todos os produtos do banco, *service', () => {
  describe('Quando não existir produto cadastrado', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([]);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await productsService.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productsService.getAll();

      expect(result).to.be.empty;
    });
  });
});

describe('Cria um novo produto', () => {    
  const payloadProduct = {
    name: 'IPA Maracujá',
    quantity: 13,
  };

  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(productsModel, 'create').resolves({ id: ID_EXAMPLE });
  });

  after(() => {
    productsModel.create.restore();
  });

  it('retorna um objeto', async () => {
  const result = await productsService.create(payloadProduct);

  expect(result).to.be.a('object');
  });

  it('o objeto possui o "id" do novo produto inserido', async () => {
    const result = await productsService.create(payloadProduct);

    expect(result).to.have.a.property('id');
  });
});

describe('Busca todos os produtos do banco', () => {
  describe('Quando não existir produto cadastrado', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await salesService.getAllSales();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await salesService.getAllSales();

      expect(result).to.be.empty;
    });
  });
});

describe('Cria uma nova venda', () => {    
  const payloadProduct = {
    name: 'IPA Maracujá',
    quantity: 13,
  };

  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(salesModel, 'create').resolves({ id: ID_EXAMPLE });
  });

  after(() => {
    salesModel.create.restore();
  });

  it('retorna um objeto', async () => {
  const result = await salesService.create(payloadProduct);

  expect(result).to.be.a('object');
  });
});

describe('Cria uma nova venda', () => {    
  const payloadProduct = {
    name: 'IPA Maracujá',
    quantity: 13,
  };

  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(salesModel, 'create').resolves({ id: ID_EXAMPLE });
  });

  after(() => {
    salesModel.create.restore();
  });

  it('retorna um objeto', async () => {
    const result = await salesService.create([payloadProduct]);

    expect(result).to.be.an('object');
  });
});


describe('Cria uma nova venda e retorna pelo ID', () => {    
 
  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(salesModel, 'getById').resolves({ id: ID_EXAMPLE });
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('retorna um objeto', async () => {
  const result = await salesService.getById(1);

  expect(result).to.be.a('object');
  });
});

describe('Testa função de update', () => {    
 
  before(() => {
    const ID_EXAMPLE = 1;
    sinon.stub(salesModel, 'update').resolves({ id: ID_EXAMPLE, quantity: 3 });
  });

  after(() => {
    salesModel.update.restore();
  });

  it('retorna um objeto', async () => {
  const result = await salesService.update(1, 3);

  expect(result).to.be.a('object');
  });
});

