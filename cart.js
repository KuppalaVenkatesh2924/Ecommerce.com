let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const itemTotal = item.price * (item.quantity || 1);
    total += itemTotal;

    let div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} 
      Quantity: <input type="number" value="${item.quantity || 1}" min="1" style="width:50px;" onchange="updateQuantity(${i}, this.value)">
      Total: $${itemTotal.toFixed(2)}
      <button onclick="removeItem(${i})">❌</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(i, qty) {
  cart[i].quantity = parseInt(qty);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function goCheckout() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

renderCart();
