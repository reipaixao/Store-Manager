const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const salesController = require('../../controllers/salesController');
const productsService = require('../../services/productsServices');
const salesService = require('../../services/salesServices');

// Usando código da aula 23.4 como modelo:
// https://github.com/tryber/sd-014-c-live-lectures/blob/lecture/23.4/movies-api/tests/models/movies/getAllModel.test.js


describe('Busca todos os produtos através da API', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productsService, 'getAll').resolves([]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('retorna o status 200', async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um JSON com um array', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('Quando existe algum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productsService, 'getAll').resolves([
        {
          id: 1,
          name: 'Sour Diesel',
          quantity: 12
        },
      ]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('retorna o status 200', async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um array em formato JSON', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('o array contém um produto', async () => {
      await productsController.getAll(req, res);

      const thirdCallArguments = res.json.args[2];
      const firstArgument = thirdCallArguments[0];
      const product = firstArgument[0];

      expect(product).to.be.an('object');
    });
  });
});

describe('Busca todos os produtos vendidos através da API', () => {
  describe('quando não existe nenhum produto vendido cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAll').resolves([]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesService.getlAll.restore();
    });

    it('retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um JSON com um array', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('Quando existe algum produto vendido', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getlAllS').resolves([
        {
          sale_id: 1,
          product_id: 1,
          quantity: 120
        },
      ]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesService.getlAll.restore();
    });

    it('retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('retorna um array em formato JSON', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });

    it('o array contém um produto', async () => {
      await salesController.getAll(req, res);

      const thirdCallArguments = res.json.args[2];
      const firstArgument = thirdCallArguments[0];
      const product = firstArgument[0];

      expect(product).to.be.an('object');
    });
  });
});

describe('Cria produtos através e retorna', () => {
  describe('quando é inserido com sucesso', async () => {
    const res = {};
    const req = {};

    before(async () => {
      req.body = {
        name: 'Grape Ale',
        quantity: 56
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(true);
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o JSON com o retorno dos valores inseridos"', async () => {
      const items = {
        name: 'Old Ale',
        quantity: 1
      };
      await productsController.create(req, res);

      expect(res.json.calledWith(items)).to.be.equal(
        true
      );
    });
  });
});
