require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
 it('Se fetchProducts é uma função', () => {
  expect.assertions(1);  
  expect(typeof fetchProducts).toBe('function');
  });
  it('Com o argumento "computador", a função fetch deve ser chamada', async () => {
    expect.assertions(1);  
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);  
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);  
   const resultado = await fetchProducts('computador');
   expect(resultado).toEqual(computadorSearch);
  });
  it('Se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const response = await fetchProducts();
    expect.assertions(1);  
    expect(response).toEqual(new Error('You must provide an url'));
  });
 })
