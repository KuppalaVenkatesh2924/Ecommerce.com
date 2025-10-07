// Retrieve cart data from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure each item has a quantity
cart = cart.map(item => ({
  ...item,
  quantity: item.quantity || 1
}));

// Function to render cart items in the table
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  // If cart is empty
  if (cart.length === 0) {
    container.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Your cart is empty!</td></tr>";
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }

  let total = 0;

  // Loop through each cart item
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input 
          type="number" 
          value="${item.quantity}" 
          min="1" 
          style="width:50px;" 
          onchange="updateQuantity(${i}, this.value)"
        >
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td>
        <button onclick="removeItem(${i})" style="cursor:pointer;">❌</button>
      </td>
    `;
    container.appendChild(row);
  });

  // Update grand total and save to localStorage
  document.getElementById("cart-total").textContent = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update quantity
function updateQuantity(index, qty) {
  const quantity = parseInt(qty);
  if (quantity < 1) return;
  cart[index].quantity = quantity;
  renderCart();
}

// Function to remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Function to clear all cart items
function clearCart() {
  cart = [];
  renderCart();
}

// Function to go to checkout page
function goCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

// Initial render when page loads
renderCart();
