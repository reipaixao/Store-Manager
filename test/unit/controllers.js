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
  });
  describe('Quando existe algum produto cadastrado', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productsService, 'getAll').resolves([
        {
          id: 1,
          name: 'Caracu',
          quantity: 20
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
  });
});

describe('insere um novo produto no BD', () => {
  describe('Em caso de sucesso', () => {
    describe('a resposta é', () => {
      const fakeReq = {};
      const fakeRes = {};

      before(() => {
        fakeReq.body = {
          name: 'Chocolate Stout',
          quantity: 103,
        };

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.stub().returns();

        sinon.stub(productsService, 'create')
          .resolves(true);
      });

      after(() => {
        productsService.create.restore();
      });

      it('codigo 201', async () => {
        await productsController.create(fakeReq, fakeRes);
        expect(fakeRes.status.calledWith(201)).to.be.true;
      });
    });
  });
});

describe('Busca todos as vendas através da API', () => {
  describe('Quando não existe nenhuma venda cadastrada', () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesService, 'getAllSales').resolves([]);

      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesService.getAllSales.restore();
    });

    it('retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });
});

// describe('Cria produtos através da API ', () => {
//   describe('quando é inserido com sucesso', async () => {
//     const res = {};
//     const req = {};

//     before(async () => {
//       req.body = {
//         name: 'Caracu',
//         quantity: 4
//       };

//       res.status = sinon.stub().returns(res);
//       res.send = sinon.stub().returns();

//       sinon.stub(productsService, 'create').resolves(req.body);
//     });

//     after(() => {
//       productsService.create.restore();
//     });

//     it('é chamado o status com o código 201', async () => {
//       await productsController.create(req, res);

//       expect(res.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o JSON com o retorno dos valores inseridos"', async () => {
//       const items = {
//         name: 'Caracu',
//         quantity: 4
//       };
//       await productsController.create(req, res);

//       expect(res.json.calledWith(items)).to.be.equal(
//         true
//       );
//     });
//   });
// });
