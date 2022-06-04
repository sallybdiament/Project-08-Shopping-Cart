require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Se fetchItem é uma função', () => {
    expect.assertions(1);  
    expect(typeof fetchItem).toBe('function');
    });
    it('Com o argumento "MLB1615760527", se a função fetch foi chamada;', async () => {
      expect.assertions(1);  
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled();
    });
    it('se, ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
      expect.assertions(1);  
      const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith(endpoint);
    });
    it('Se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
      expect.assertions(1);  
     const resultado = await fetchItem('MLB1615760527');
     expect(resultado).toEqual(item);
    });
    it('Se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
      const response = await fetchItem();
      expect.assertions(1);  
      expect(response).toEqual(new Error('You must provide an url'));
    });
});
