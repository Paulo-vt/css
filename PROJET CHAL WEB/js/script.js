let cart = [
    { 
        id: 1, 
        name: "Lampe Lace", 
        price: 59.99, 
        quantity: 1, 
        image: "../images/Lampe_2.jpg" 
    },
];

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <p class="product-name font-bold">${item.name}</p>
                    <p class="product-price">${item.price} € x ${item.quantity} = ${itemTotal} €</p>
                </div>
                <div class="actions">
                    <button class="bg-gray-200 px-2 py-1 rounded" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="bg-gray-200 px-2 py-1 rounded" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="removeFromCart(${item.id})">Supprimer</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `${total} €`;
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function checkout() {
    alert("Merci pour votre achat !");
    cart = []; 
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);