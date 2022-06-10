// Definindo uma constante do valor total:
const t = 'total-price';

// Função que cria a imagem do produto com o parametro que é a fonte da imagem:
const createProductImageElement = (imageSource) => {
  // constante que cria um elemento que é uma img via Dom:
  const img = document.createElement('img');
  // incluindo a classe 'item__image' no elemento Dom criado acima:
  img.className = 'item__image';
  // inclui o parametro desta função como src da imagem:
  img.src = imageSource;
  // Returna esse elemento img criado com classe 'item__image' e com a foto do produto:
  return img;
};

// Função que cria um elemento customizado com o 1o parametro que define o tipo de elemento, o 2o parametro que define o nome da classe e o 3o parametro que insere um texto neste elemento:
const createCustomElement = (element, className, innerText) => {
  // constante que cria um elemento que será definido pelo 1o parametro via DOM:
  const e = document.createElement(element);
  // adicionando uma classe a esse elemento criado. A classe adicionada é o 2o parametro:
  e.className = className;
  // adiciona um texto ao elemento criado. O texto adicionado é o 3o parametro:
  e.innerText = innerText;
  return e;
};

const soma2 = () => {
  let total = 0;
  const lista = document.getElementsByTagName('li');
for (let i = lista.length - 1; i >= 0; i -= 1) {
  // console.log(lista[i]);
  // console.log(lista[i].innerText);
  const liEmArray = lista[i].innerText.split(' ');
  // console.log(liEmArray);
  // console.log(liEmArray[liEmArray.length-1]);
  // console.log(typeof preco);
 const precoEmNumero = parseFloat(liEmArray[liEmArray.length - 1].replace('$', ''));
  // console.log(precoEmNumero);
  // const precoEmNumeroRound = Math.round(precoEmNumero * 100) / 100;
  // console.log(precoEmNumeroRound);
  total = precoEmNumero + total;
}
const cartTotal = document.getElementsByTagName('p')[0];
cartTotal.innerText = total;
// return total;
};
// const cartTotalRound = Math.round(total * 100) / 100; 

// Essa função serve para remover o item do carrinho de compras quando ele for clicado de acordo com a função createCartItemElement, essa função será chamada dentro do evento de clique (que é a LI que será clicada)://
const cartItemClickListener = (event) => {
// console.log(event.target.innerHTML);
  // event.target: vai ser a LI criada no carrinho de compras.
// Pega o evento do clique (que é a LI criada no carrinho de compras) e remove ele:
// console.log(event.target.innerText.split(' '));
// const liEmArray = event.target.innerText.split(' ');
//  const p = parseFloat(liEmArray[liEmArray.length - 1].replace('$', ''));
//  const pRound = Math.round(p * 100) / 100;
const paiDoEventoLi = event.target.parentElement;
// console.log(paiDoEventoLi.parentElement);
// Aqui a ordem é fundamental: primeiro faz a constante paiDoEventoLi que captura a Ol para depois apagar a li (o item do carrinho) que for clicado e só depois roda a saveCartItems para salvar no localStorage sem o item q foi excluído:
event.target.remove();
saveCartItems(paiDoEventoLi.innerHTML);
// const totalCart = document.getElementsByClassName(t)[0];
// totalCart.innerText = document.getElementsByClassName(t)[0].innerText - p;
soma2();
};

const cartTotalValue = () => {  
  const sectionCart = document.getElementsByClassName('cart')[0];
sectionCart.appendChild(createCustomElement('p', t, 0));
};

// Essa função já veio no projeto:
const createCartItemElement = ({ sku, name, salePrice }) => {
  // 1o - ela cria as lis que são cada item (cada computador) do carrinho de compras.
  const li = document.createElement('li');
  // 2o - ela inclui a classe 'cart__item' em todas as lis criadas.
  li.className = 'cart__item';
  // 3o - ela inclui o conteúdo dessas lis através do innerText e de acordo com os parâmetros passados para a função.
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // 4o - adiciona um escutador de evento (addEventListener) na li e com um 'click' chama a função  cartItemClickListener (função para apagar a li (o computador do carrinho) quando ele for clicado):
  li.addEventListener('click', cartItemClickListener);
  // let soma = 0;
  // soma += salePrice;
  // console.log(soma);
  // 5o - por fim, retorna a Li criada nesta função que é o que vai estar no carrinho de compras:
  return li;
};

// Essa função já seleciona o Id do item pela classe 'item_sku' e depois usa o fetch para adicionar ao carrinho de compras:
 // A 1a constante (IdItem) é o id do computador que está na lista de produtos da página.
const getSkuFromProductItem = async (item) => {
  const IdItem = item.querySelector('span.item__sku').innerText;
  // console.log(IdItem);
  // Essa constante é a ol que será o pai das lis com os computadores escolhidos:
  const olPaiCarrinho = document.getElementsByClassName('cart__items')[0];
  // Essa variável vai chamar a função fetchItem que busca os itens na API do mercado livre recebendo como parametro o id do computador:
  const productsComputadores = await fetchItem(IdItem);
  // Utilizei destructuring para pegar do objeto da api os valores das chaves id, title e price e depois fazemos o objeto conforme pede para ser o parametro da função createCartItemElement:
  const { id, title, price } = productsComputadores;
  const produto = {
    sku: id,
    name: title,
    salePrice: price,
  };
  // console.log(createCartItemElement(produto)); // Chamamos a função createCartItemElement que cria as lis e colocamos as lis como filhas da constante criada para capturar a ol:
olPaiCarrinho.appendChild(createCartItemElement(produto));
saveCartItems(olPaiCarrinho.innerHTML);
soma2();
};
// const sectionCart = document.getElementsByClassName('cart')[0];
// sectionCart.appendChild(createCustomElement('span', 'total-price', price));
// console.log(olPaiCarrinho.innerText); 
// Chamamos a função saveCartItems que salva no localStorage o conteúdo html da ol.

// Essa função é chamada para adicionar os produtos da API no lado esquerdo da página:
// constante section cria uma seção:
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  // atribui a classe 'item'para essa seção criada:
  section.className = 'item';
 // Dentro dessa seção appendemos os filhos chamando as primeiras funções que criam elementros (createCustomElement) e a imagem (createProductImageElement) com os parametros desejados e que serão o título, a descrição e a foto do computador:
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  // Aqui eu usei o appendChild do butão para já adicionar o evento de clique e levar ele para o carrinho de compras:
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', (event) => {
  getSkuFromProductItem(event.target.parentNode);
  // console.log(event.target.parentNode);
  // somaCarrinho = 
});
section.appendChild(botao);
  return section;
};
// O event.target.parentNode é toda a sessão que é pai do botão, ou seja, toda a seção com as informações do computador criadas acima: sku, nome, imagem e o próprio botão:
// o retorno da função acima é cada nova section que é criada no lado esquerdo da página com os computadores a venda.

// Usei a função createCustomElement para crias um elemento span com a classe loading e que aparece escrito 'carregando' que será usado antes da requisição a API:
const loader = createCustomElement('span', 'loading', 'Carregando');

// Eu criei essa função para buscar na API os produtos de 'computador' e usar o destructuring para pegar as infos que queremos e com a createProductItemElement() jogamos a info na página:
const setProducts = async () => {
  const sectionPai = document.getElementsByClassName('items')[0];
  sectionPai.appendChild(loader);
  const productsComputadores = await fetchProducts('computador');
  // depois de buscar os produtos na api, ele passa um por um pegando os dados que queremos que apareça na tela (e que serão usados como parametro na função createProductItemElement):
  productsComputadores.results.forEach((computador) => {
    const { id, title, thumbnail } = computador;
  // console.log(id);
  // poderia também ter usado 'sku: comutador.id' no lugar do destructuring acima:
    const produto = {
      sku: id,
    name: title,
    image: thumbnail,
  };
// console.log(produto);
sectionPai.appendChild(createProductItemElement(produto));
loader.remove();
});
};

// Função que resgata os itens do localStorage ao recarregar a página:
const chamandoGetSavedCart = () => {
const sectionOl = document.getElementsByClassName('cart__items')[0];
// Aqui inserimos no html da Ol o que a função de localStorage.getItem resgatou (ou seja, as lis que estavam no carrinho quando a página foi fechada):
sectionOl.innerHTML = getSavedCartItems();
// console.log(sectionOl.childNodes);
// Incluindo o evento de apagar nos filhos da Ol resgatada do localStorage: 
sectionOl.childNodes.forEach((li) => {
  li.addEventListener('click', cartItemClickListener);
});
cartTotalValue();
soma2();
};

// const botao = document.getElementsByClassName('item__add')[0];
// O console.log abaixo não funciona:
// console.log(botao);
// botao.addEventListener('click', () => {
// console.log('teste');
// });

// Limpar lista:
// Ref: https://cursos.alura.com.br/forum/topico-excluir-todos-os-elementos-com-uma-classe-159597
function apagar() {
  const lista = document.getElementsByTagName('li');
  const paiDoEventoLi = document.getElementsByClassName('cart__items')[0];
  // console.log(paiDoEventoLi);
  for (let i = lista.length - 1; i >= 0; i -= 1) {
    lista[i].remove();
  }
  saveCartItems(paiDoEventoLi.innerHTML);
  document.getElementsByClassName('total-price')[0].innerText = 0;
}

const botaoEsvaziarCarrinho = document.getElementsByClassName('empty-cart')[0];
botaoEsvaziarCarrinho.addEventListener('click', apagar);

// cartTotalValue();
window.onload = () => { chamandoGetSavedCart(); setProducts(); };
