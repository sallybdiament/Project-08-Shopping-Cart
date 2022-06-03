const fetchProducts = async (produto) => {
 const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
 try {
 const response = await fetch(endpoint);
 const results = await response.json();
 return results;
} catch (error) {
  console.log(error);
  return error;
  }
};

// fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}