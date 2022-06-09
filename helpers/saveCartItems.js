const saveCartItems = (parametroOl) => {
  // if (!parametroOl) {
  //  return localStorage.removeItem('cartItems');
  // }
  localStorage.setItem('cartItems', parametroOl);
  // console.log(parametroOl);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
