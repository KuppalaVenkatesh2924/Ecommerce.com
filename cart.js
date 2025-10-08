let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure each item has quantity
cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

// Render cart items
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    document.getElementById("cart-total").textContent = "Total: ₹0";
    return;
  }

  let totalAmount = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    container.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
          ${item.quantity}
          <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
        </td>
        <td>₹${itemTotal}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  document.getElementById("cart-total").textContent = `Total: ₹${totalAmount}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase quantity
function increaseQuantity(index) {
  cart[index].quantity++;
  renderCart();
}

// Decrease quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  cart = [];
  renderCart();
});

// Initial render
renderCart();
