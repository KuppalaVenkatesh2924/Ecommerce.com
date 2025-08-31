let cart = JSON.parse(localStorage.getItem("cart")) || [];
let address = JSON.parse(localStorage.getItem("address"));
let payment = localStorage.getItem("payment");

let summary = document.getElementById("order-summary");

let html = `<h3>Shipping Address</h3>
<p>${address.name}, ${address.address}, ${address.city}, ${address.zip}</p>
<h3>Payment Method</h3>
<p>${payment}</p>
<h3>Products</h3>`;

let total = 0;
cart.forEach(item => {
  total += item.price;
  html += `<p>${item.name} - $${item.price}</p>`;
});

html += `<h3>Total Paid: $${total}</h3>`;
summary.innerHTML = html;

// clear cart after order
localStorage.removeItem("cart");
