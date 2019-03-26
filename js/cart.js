var productCart = {};

$.getJSON('products.json', function (data) {
    var products = data;
    checkCart();
    console.log(productCart);
    showCart();

    function showCart() {
        if ($.isEmptyObject(productCart)) {
            var emptyCart = 'Your cart is empty. Add products to cart <a href="./index.html">on main page</a>';
            $('#main-page').html(emptyCart);
        } else {
            var productInCart = '';
            for (var key in  productCart) {
                productInCart += `<div class="product"> `;
                productInCart += `<button class="remove btn btn-success" data-art="${key}">x</button>`;
                productInCart += `<img src="${products[key].image}" >`;
                productInCart += `<h2 class="name">${products[key].name}  </h2>`;
                productInCart += `<p>total $: ${productCart[key] * products[key].cost}</p>`;
                productInCart += `<button class="decrease-amount btn btn-success" data-art="${key}"> - </button>`;
                productInCart += `<p >${productCart[key]}  </p>`;
                productInCart += `<button class="increase-amount btn btn-success"  data-art="${key}"> + </button>`;
                productInCart += `</div>`;

            }
            $('#show-cart').html(productInCart);
            $('.increase-amount').on('click', increaseAmount);
            $('.decrease-amount').on('click', decreaseAmount);
            $('.remove').on('click', removeProduct);
        }
    }

    function increaseAmount() {
        var productArticul = $(this).attr('data-art');
        productCart[productArticul]++;
        saveCurrentAmount();
        showCart();
    }

    function decreaseAmount() {
        var productArticul = $(this).attr('data-art');
        if (productCart[productArticul] > 1) {
            productCart[productArticul]--;
        } else {
            delete productCart[productArticul];
        }
        saveCurrentAmount();
        showCart();
    }

    function removeProduct() {
        var productArticul = $(this).attr('data-art');
        delete productCart[productArticul];

        saveCurrentAmount();
        showCart();
    }
});

function checkCart() {
    if (localStorage.getItem('productCart') !== null) {
        productCart = JSON.parse(localStorage.getItem('productCart'));
    }
}

function saveCurrentAmount() {
    localStorage.setItem('productCart', JSON.stringify(productCart));
}
