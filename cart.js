let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure quantity exists
cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

function renderCart() {
  const tbody = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-cart");
  tbody.innerHTML = "";

  if (cart.length === 0) {
    document.getElementById("cart-total").textContent = "Grand Total: $0.00";
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";
  let total = 0;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1"
          onchange="updateQuantity(${i}, this.value)">
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button onclick="removeItem(${i})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("cart-total").textContent = `Grand Total: $${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, qty) {
  const quantity = parseInt(qty);
  if (quantity < 1) return;
  cart[index].quantity = quantity;
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    renderCart();
  }
}

function goCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

// Initial render
renderCart();
