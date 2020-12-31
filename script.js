let modalQtd = 1;
//retorna apenas o item 
const elemento = (item) => document.querySelector(item);
//retorna um array com os itens que foi encontrado 
const elementoEncontrado = (item) => document.querySelectorAll(item);

//mapeamento das pizzas para exibir 
pizzaJson.map((item, index) => {
    let pizzaItem = elemento('.models .pizza-item').cloneNode(true);

    //setando o atributo da pizza para pegar quando o modal é aberto
    pizzaItem.setAttribute('data-key', index);

    //preencher as informações em pizzaItem 
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //abrindo o modal 
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;
        
        //pegando as informações para o modal 
        elemento('.pizzaBig img').src = pizzaJson[key].img;
        elemento('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        elemento('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        elemento('.pizza-item--price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        elemento('.pizzaInfo--size.selected').classList.remove('selected');
        elementoEncontrado('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        elemento('pizzaInfo--qt').innerHTML = modalQtd;
        elemento('.pizzaWindowArea').style.opacity = 0;
        elemento('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
        elemento('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        
    });

    elemento('.pizza-area').append( pizzaItem);
});