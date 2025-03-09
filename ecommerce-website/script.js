const products = [
    { id: 1, name: "Apple", price: 150, img:  "images/apple.jpg"},
    { id: 2, name: "Banana", price: 30, img: "images/bannana.jpg" },
    { id: 3, name: "Mango", price: 70, img: "images/mango.jpg" },
    { id: 4, name: "Orange", price: 40, img: "images/orange.jpg" },
    { id: 5, name: "Watermelon", price: 60, img: "images/watermelon.jpg" },
    { id: 6, name: "grapes", price: 70, img: "images/grapes.jpg" },
    { id: 7, name: "jackfruit", price: 80, img: "images/jackfruit.jpg" },
    { id: 8, name: "kiwi", price: 100, img: "images/kiwi.jpg" },
    { id: 9, name: "pineapple", price: 120, img: "images/pineapple.jpg" },
    { id: 10, name: "pomegranate", price: 200, img: "images/pomegranate.jpg" },
    { id: 11, name: "guava", price: 50, img: "images/guava.jpg" },
    { id: 12, name: "strawberry", price: 80, img: "images/strawberry.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(id) {
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " added to cart!");
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function viewCart() {
    let cartModal = document.getElementById("cart-modal");
    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join("");
    
    cartModal.style.display = "block";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function searchProducts() {
    let query = document.getElementById("search-bar").value.toLowerCase();
    let filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));

    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    filteredProducts.forEach(product => {
        let productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ date: new Date().toLocaleString(), items: cart });
    localStorage.setItem("orders", JSON.stringify(orders));

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    closeCart();
    alert("Order placed successfully!");
}

window.onload = function() {
    displayProducts();
    updateCartCount();
};
