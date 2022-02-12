const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
// const salesController = require('../../controllers/salesController');
const productsService = require('../../services/productsServices');
// const salesService = require('../../services/salesServices');

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
  });
});
