const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsService = require('../../services/productsServices');
const productsModel = require('../../models/productsModel');

// Usando código da aula 23.4 como modelo:
// https://github.com/tryber/sd-014-c-live-lectures/blob/lecture/23.4/movies-api/tests/models/movies/getAllModel.test.js

describe('Busca todos os produtos do banco', () => {
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

  describe('Quando existe algum produto cadastrado', () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([
        {
          id: 1,
          name: 'Amber Ale',
          quantity: 244,
        },
      ]);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await productsService.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await productsService.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [item] = await productsService.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
      const [item] = await productsService.getAll();

      expect(item).to.include.all.keys(
        'id',
        'name',
        'quantity',
      );
    });
  });
});

describe('Cria um novo produto', () => {
  describe('quando é inserido um produto', () => {
    const payloadProduct = {
      name: 'Amber Ale',
      quantity: 40
    };

    before(async () => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('quando é inserido com sucesso', async () => {
      it('retorna um objeto', async () => {
        const result = await productsService.create(payloadProduct);

        expect(result).to.be.a('object');
      });

      it('o objeto possui o "id" do novo produto inserido', async () => {
        const result = await productsService.create(payloadProduct);

        expect(result).to.have.a.property('id');
      });
    });
  });
})
