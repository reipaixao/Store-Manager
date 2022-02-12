const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

// // Usando código da aula 23.4 como modelo:
// // https://github.com/tryber/sd-014-c-live-lectures/blob/lecture/23.4/movies-api/tests/models/movies/getAllModel.test.js

describe('Busca todos produtos do banco', () => {
  describe('Quando não existir nenhum produto cadastrado', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
    });
  });
});

describe('Insere um novo filme no BD', () => {
  const payloadProduct = {
    name: 'À Palo Santo',
    quantity: 10,
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
      const response = await productsModel.create(payloadProduct);

      expect(response).to.be.a('object');
    });
  });
});
 
describe('quando é chamado um id', () => {
  before(async () => {
    const payloadProduct = {
      id: 3,
      name: 'Saison Umbu',
      quantity: 151
    };

    sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
  })

  after(() => {
    connection.execute.restore();
  });

  it('o objeto possui o "id","name" e "quantitiy"', async () => {

    const result = await productsModel.getById(3);

    expect(result).to.include.all.keys(
      'id',
      'name',
      'quantity'
    );
  });
});

describe('Atualiza produto no BD', () => {
  const payloadProduct = {
    id: 1,
    name: 'IPA Maracujá',
    quantity: 13,
  };

  before(() => {
    sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um objeto', async () => {
    const result = await productsModel.update(1, 'Ginger IPA', 15);

    expect(result).to.be.an('object');
  });
});

describe('Quando remove um produto', () => {
  const products = {
      id: 1,
      name: 'Wine Ale',
      quantity: 10
  }
  before(() => {
      sinon.stub(connection, 'execute').resolves([[products]]);
  });

  after(() => {
      connection.execute.restore();
  });

  it('ele realmente é excluido do BD', async () => {
      await productsModel.remove();
  });
});

describe('Busca todas as vendas no banco', () => {
  describe('Quando não existir nenhuma venda', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getAllSales();

      expect(result).to.be.an('array');
    });
  });
});

// describe('Atualiza venda no BD', () => {
//   const payloadProduct = {
//     id: 1,
//     name: 'IPA Maracujá',
//     quantity: 13,
//   };

//   before(() => {
//     sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
//   });

//   after(() => {
//     connection.execute.restore();
//   });

//   it('retorna um objeto', async () => {
//     const result = await salesModel.create([
//       {
//         product_id: 1,
//         quantity: 20,
//       },
//       {
//         product_id: 3,
//         quantity: 37,
//       },
//     ]);

//     expect(result).to.be.an('object');
//   });
// });

// Consulta ao PR #68