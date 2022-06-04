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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const botaoAddCarrinho = document.querySelectorAll('.item')[0];
  botaoAddCarrinho.addEventListener('click', () => {
    alert('teste');
  });
};

// cartItemClickListener();

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

window.onload = () => { };
