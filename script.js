const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = async (item) => {
  const IdItem = item.querySelector('span.item__sku').innerText;
  const sectionPaiCarrinho = document.getElementsByClassName('cart__items')[0];
  const productsComputadores = await fetchItem(IdItem);
  const { id, title, price } = productsComputadores;
  const produto = {
    sku: id,
    name: title,
    salePrice: price,
  };
sectionPaiCarrinho.appendChild(createCartItemElement(produto));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', (event) => {
  // console.log(event.target.parentNode); 
  getSkuFromProductItem(event.target.parentNode);
});
section.appendChild(botao);

  return section;
};

const setProducts = async () => {
  const sectionPai = document.getElementsByClassName('items')[0];
  const productsComputadores = await fetchProducts('computador');
  productsComputadores.results.forEach((computador) => {
    const { id, title, thumbnail } = computador;
  // console.log(id);
    const produto = {
      sku: id,
    name: title,
    image: thumbnail,
  };
// console.log(produto);
sectionPai.appendChild(createProductItemElement(produto));
});
};

setProducts();

// const cartItemClickListener = (event) => {

// };

window.onload = () => { };
