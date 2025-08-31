// Products
let products =  [
  {
    id: 1,
    name: "Laptop",
    price: 800,
    desc: "High performance laptop",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 500,
    desc: "Latest smartphone",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
  },
  {
  id: 3,
  name: "Headphones",
  price: 100,
  desc: "Noise cancelling headphones",
  img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Camera",
    price: 400,
    desc: "HD DSLR Camera",
    img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&auto=format&fit=crop&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const section = document.getElementById("products");
  products.forEach(p => {
    let div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><b>$${p.price}</b></p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    section.appendChild(div);
  });
}

function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

renderProducts();
updateCartCount();
