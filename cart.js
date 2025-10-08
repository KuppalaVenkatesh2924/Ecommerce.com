// Always reload from storage freshly
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure quantity
cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    document.getElementById("cart-total").textContent = "Total: ₹0";
    localStorage.removeItem("cart"); // clear from storage
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
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">−</button>
          ${item.quantity}
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </td>
        <td>₹${itemTotal}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  document.getElementById("cart-total").textContent = `Total: ₹${totalAmount}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase/decrease quantity
function updateQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Remove one item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Clear all items
document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  }
});

// Checkout
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});

// ✅ Fix browser back-cache problem
window.addEventListener("pageshow", (event) => {
  // Always reload from localStorage when coming back
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = storedCart;
  renderCart();
});

// Initial render
renderCart();
