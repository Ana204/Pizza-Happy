let modalQtd = 1;
let cart = [];
let modalKey = 0;
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
        modalKey = key;

        //pegando as informações para o modal 
        elemento('.pizzaBig img').src = pizzaJson[key].img;
        elemento('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        elemento('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        elemento('.pizza-item--price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        elemento('.pizzaInfo--size.selected').classList.remove('selected');
        elementoEncontrado('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        elemento('.pizzaInfo--qt').innerHTML = modalQtd;
        elemento('.pizzaWindowArea').style.opacity = 0;
        elemento('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            elemento('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });

    elemento('.pizza-area').append(pizzaItem);
});

//evento para fechar o modal 
function FecharModal() {
    elemento('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        elemento('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
elementoEncontrado('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', FecharModal);
})

//evento para quantidade de pizza
elemento('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        elemento('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});

elemento('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    elemento('.pizzaInfo--qt').innerHTML = modalQtd;
});

//evento para seleção de tamanhos
elementoEncontrado('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        elemento('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//pegando informações para colocar ao carrinho de compras 
elemento('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(elemento('.pizzaInfo--size.selected').getAttribute('data-key'));

    //indentificador do id e do tamanho da pizza
    let indentifier = pizzaJson[modalKey].id +'@'+size;

    //verificando se o indetificador é igual ao indetificador 
    let key = cart.findIndex((item) => item.indentifier == indentifier);

    if (key > -1) {
        cart[key].qt += modalQtd;
    } else {
        //adicionando no carrinho de compras 
        cart.push({
            indentifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQtd
        });
    }

    updateCart();
    FecharModal();
});

//abrindo carrinho no moblie caso tenha alguma pizza
elemento('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        elemento('aside').style.left = '0';
    }
});

elemento('.menu-closer').addEventListener('click', () => {
    elemento('aside').style.left = '100vw';
})

//função para o carrinho de compras 
function updateCart() {
    elemento('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        elemento('aside').classList.add('show');
        elemento('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qt;
            let cartItem = elemento('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            switch(cart[i].size){
                case 0: 
                pizzaSizeName = 'P';
                break;

                case 1: 
                pizzaSizeName = 'M';
                break;

                case 2: 
                pizzaSizeName = 'G';
                break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            elemento('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        elemento('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        elemento('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        elemento('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        elemento('aside').classList.remove('show');
        elemento('aside').style.left = '100vw';
    }
}

