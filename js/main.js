var productCart = {};

$('document').ready(function () {
    loadProducts();
    checkCart();
    showCart();
});

function loadProducts() {
    $.getJSON('products.json', function (data) {
        //console.log(data);
        var product = '';
        for (var key in data) {
            product += `<div class="one-product"> `;
            product += `<h2> ${data[key]['name']} </h2>`;
            product += `<p>price $: ${data[key]['cost']}</p>`;
            product += `<img src="${data[key]['image']}" alt="product">`;
            product += `<button  class=" btn btn-success add-to-cart"  data-art="${key}" type="button" >add to cart</button>`;
            product += `</div>`;

        }
        $('#products').html(product);
        $('button.add-to-cart').on('click', addToCart)
    })
}



function addToCart() {
    var productArticul = $(this).attr('data-art');
    if (productCart[productArticul] !== undefined) {
        productCart[productArticul]++;
    } else {
        productCart[productArticul] = 1;
    }
    localStorage.setItem('productCart', JSON.stringify(productCart));
    showCart();
}


function checkCart() {
    if (localStorage.getItem('productCart') !== null) {
        productCart = JSON.parse(localStorage.getItem('productCart'));
    }
}

function showCart() {
    var productInCart = '';
    for (var i in  productCart) {
        productInCart += `<p>${i}:  ${productCart[i]}</p>`;
    }
    productInCart += `<a href="./cart.html"><i class="fas fa-shopping-cart"></i>Go to Cart</a>`;
    $('#cart').html(productInCart);
}

$(document).on('click', 'button.btn-success', function () {
    $('.modal-overlay').addClass('active');
    $(document.body).addClass('modal-opened');
    var top = $(document).scrollTop();
    $('.modal-overlay').css('top', top);
    $('[data-close]').click(function () {
        $('.modal-overlay').removeClass('active');
        $(document.body).removeClass('modal-opened');
    });
    $('.modal-body').click(function (event) {
        event.stopPropagation();

    });
});


function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML =`<br> ${errorMessage}`;
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className === "error-message") {
        container.removeChild(container.lastChild);
    }
}

$('document').ready(function () {
    $('.btn-submit').click(function () {

        var elems = this.form.elements;

        resetError(elems.name.parentNode);
        if (!elems.name.value) {
            showError(elems.name.parentNode, ' enter your name');
        }

        resetError(elems.email.parentNode);
        if (!elems.email.value) {
            showError(elems.email.parentNode, ' enter yor email');
        }

        resetError(elems.phone.parentNode);
        if (!elems.phone.value) {
            showError(elems.phone.parentNode, ' enter your  phone number');
        }
    });
});

