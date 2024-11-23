// Объект для хранения товаров в корзине
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let total = parseInt(localStorage.getItem('total')) || 0;

// Функция обновления количества товаров в иконке корзины
function updateCartIcon() {
    const cartCount = document.getElementById('cartCount');
    let itemCount = 0;
    for (let item in cart) {
        itemCount += cart[item].quantity;
    }
    cartCount.textContent = itemCount;
}

// Функция показа или скрытия всплывающего окна корзины
function toggleCartPopup() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = (cartPopup.style.display === 'none') ? 'block' : 'none';
}

// Функция добавления товара в корзину
function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    total += itemPrice;
    saveCart();
    updateCartDisplay();
}

// Функция обновления отображения содержимого корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItems.innerHTML = ''; // Очищаем список товаров
    let newTotal = 0;

    for (let item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} - ${cart[item].price} сом x ${cart[item].quantity} = ${cart[item].price * cart[item].quantity} сом`;

        // Кнопки для изменения количества товара
        const buttonDecrease = document.createElement('button');
        buttonDecrease.textContent = '-';
        buttonDecrease.onclick = () => changeQuantity(item, -1);

        const buttonIncrease = document.createElement('button');
        buttonIncrease.textContent = '+';
        buttonIncrease.onclick = () => changeQuantity(item, 1);

        li.appendChild(buttonDecrease);
        li.appendChild(buttonIncrease);
        cartItems.appendChild(li);

        newTotal += cart[item].price * cart[item].quantity;
    }

    total = newTotal;
    totalPrice.textContent = `${total} сом`;
    updateCartIcon();
}

// Функция изменения количества товара
function changeQuantity(item, delta) {
    if (cart[item]) {
        cart[item].quantity += delta;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        saveCart();
        updateCartDisplay();
    }
}

// Функция сохранения корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

// Функция загрузки корзины при загрузке страницы
window.onload = function() {
    updateCartDisplay();
};
// Функция для добавления товара в корзину
function addToCartFromSelect(variantId, name) {
    const selectElement = document.getElementById(variantId);
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const price = parseInt(selectedOption.value); // Используем parseInt, чтобы гарантировать числовой тип
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    // Создаем элемент для отображения товара в корзине
    const item = document.createElement("li");
    item.textContent = `${name} - ${price} сом`;
    cartItems.appendChild(item);

    // Обновляем итоговую сумму
    let currentTotal = parseInt(totalPriceElement.textContent) || 0; // Если итоговая сумма пуста, ставим 0
    const updatedTotal = currentTotal + price; // Прибавляем цену товара
    totalPriceElement.textContent = updatedTotal;
}

// Функция для отображения или скрытия попапа корзины
function toggleCartPopup() {
    const cartPopup = document.getElementById("cartPopup");
    if (cartPopup.style.display === "block") {
        cartPopup.style.display = "none";
    } else {
        cartPopup.style.display = "block";
    }
}

// Функция для открытия формы оформления заказа
function openCheckoutForm() {
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("cartPopup").style.display = "none"; // Скрыть корзину
}

// Функция для закрытия формы оформления заказа
function closeCheckoutForm() {
    document.getElementById("checkoutForm").style.display = "none";
}
// Инициализируем корзину при загрузке страницы
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Добавление товара в корзину
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Обновление отображения корзины на странице
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

// Загрузка корзины при загрузке страницы
window.onload = function() {
    updateCartDisplay();
};
