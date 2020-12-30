//retorna apenas o item 
const elemento = (item) => document.querySelector(item);

//retorna um array com os itens que foi encontrado 
const elementoEncontrado = (item) => document.querySelectorAll(item);

//mapeamento das pizzas para exibir 
pizzaJson.map((item, index) => {
    let pizzaItem = elemento('.models .pizza-item').cloneNode(true);

    //preencher as informações em pizzaItem 
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    elemento('.pizza-area').append( pizzaItem);
});