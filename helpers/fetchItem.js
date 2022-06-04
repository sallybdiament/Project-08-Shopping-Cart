const fetchItem = async (ItemID) => {
  const endpoint = `https://api.mercadolibre.com/items/${ItemID}`;
 try {
 const response = await fetch(endpoint);
 const data = await response.json();
//  console.log(data);
 return data;
} catch (error) {
  return error;
  }
};

// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
