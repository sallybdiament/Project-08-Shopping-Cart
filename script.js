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

// Essa função serve para remover o item do carrinho de compras quando ele for clicado de acordo com a função createCartItemElement://
const cartItemClickListener = (event) => {
event.target.remove();
const paiDoEventoLi = event.target.parentElement;
saveCartItems(paiDoEventoLi.innerHTML);
};

// Essa função já veio no projeto e ela cria os itens do carrinho de compras e aciona a função para apagar o item quando ele for clicado:  
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Essa função já seleciona o Id do item pela classe 'item_sku' e depois usa o fetch para adicionar ao carrinho de compras:
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
  // console.log(createCartItemElement(produto));
sectionPaiCarrinho.appendChild(createCartItemElement(produto));
saveCartItems(sectionPaiCarrinho.innerHTML);
// console.log(sectionPaiCarrinho.innerHTML);
};

// Essa função é chamada para adicionar os produtos da API na página:
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  // Aqui eu usei o appendChild do butão para já adicionar o evento de clique e levar ele para o carrinho de compras:
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', (event) => {
  // console.log(event.target.parentNode); 
  getSkuFromProductItem(event.target.parentNode);
});
section.appendChild(botao);
  return section;
};

// Eu criei essa função para buscar na API os produtos de 'computador' e usar o destructuring para pegar as infos que queremos e com a createProductItemElement() jogamos a info na página:
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

const chamandoGetSavedCart = () => {
const sectionOl = document.getElementsByClassName('cart__items')[0];
sectionOl.innerHTML = getSavedCartItems();
// console.log(sectionOl.childNodes);
// Incluindo o evento de apagar nos filhos da Ol resgatada do localStorage: 
sectionOl.childNodes.forEach((li) => {
  li.addEventListener('click', cartItemClickListener);
});
};

setProducts();

const botao = document.getElementsByClassName('item__add')[0];
// O console.log abaixo não funciona:
// console.log(botao);
// botao.addEventListener('click', () => {
// console.log('teste');
// });

// Limpar lista:
// Ref: https://cursos.alura.com.br/forum/topico-excluir-todos-os-elementos-com-uma-classe-159597
function apagar() {
  const lista = document.getElementsByTagName('li');
  for (let i = lista.length - 1; i >= 0; i -= 1) {
    lista[i].remove();
  }
}

const botaoEsvaziarCarrinho = document.getElementsByClassName('empty-cart')[0];
botaoEsvaziarCarrinho.addEventListener('click', apagar);

window.onload = () => { chamandoGetSavedCart(); };
