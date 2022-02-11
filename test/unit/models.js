const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

// Usando código da aula 23.4 como modelo:
// https://github.com/tryber/sd-014-c-live-lectures/blob/lecture/23.4/movies-api/tests/models/movies/getAllModel.test.js

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

    it('o array está vazio', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.empty;
    });
  });
});

describe('Quando existir pelo menos um produto cadastrado', () => {
  before(async () => {
    const product = {
      id: 1,
      name: 'Saison Murici',
      quantity: 51,
    };

    sinon.stub(connection, 'execute').resolves([[product]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um array', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
  });

  it('o array não está vazio', async () => {
    const result = await productsModel.getAll();

    expect([result]).to.not.be.empty;
  });

  it('todos os itens do array têm o tipo "objeto"', async () => {
    const result = await productsModel.getAll();

    result.map((item) => {
      expect(item).to.be.an('object');
    });
  });

  it('os itens possuem as propriedades "id", "name", "quantity"', async () => {
    const result = await productsModel.getAll();

    result.map((item) => {
      expect(item).to.include.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: 'Saison Umbu',
    quantity: 151
  };

  before(async () => {
    sinon.stub(connection, 'execute').resolves([[payloadProduct]]);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.create([payloadProduct]);

      expect(response).to.be.a('array');
    });

    it('tal objeto possui o "id","name" e "quantitiy"', async () => {
      const response = await productsModel.create();

      expect(response).to.include.all.keys(
        'id',
        'name',
        'quantity'
      );
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

  it('o objeto não está vazio', async () => {
    const result = await productsModel.getById(3);

    expect(result).to.be.not.empty;
  })

  it('tal objeto possui o "id","name" e "quantitiy"', async () => {
    const result = await productsModel.getById(1);

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

  it('o objeto não está vazio', async () => {
    const result = await productsModel.update(1, 'Ginger IPA', 25);

    expect(result).not.to.be.empty;
  });

  it('tal objeto possui o "id","name" e "quantitiy"', async () => {
    const response = await productsModel.update(1, 'Ginger IPA', 25);

    expect(response).to.include.all.keys(
      'id',
      'name',
      'quantity'
    );
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
