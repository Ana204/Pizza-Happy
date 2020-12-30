//retorna apenas o item 
const elemento = (item) => document.querySelector(item);

//retorna um array com os itens que foi encontrado 
const elementoEncontrado = (item) => document.querySelectorAll(item);

//mapeamento das pizzas para exibir 
pizzaJson.map((item, index) => {
    let pizzaItem = elemento('.models .pizza-item').cloneNode(true);

    //preencher as informações em pizzaItem 

    elemento('.pizza-area').append( pizzaItem);
});