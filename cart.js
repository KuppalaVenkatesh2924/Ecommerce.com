let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    let div = document.createElement("div");
    div.innerHTML = `${item.name} - $${item.price} <button onclick="removeItem(${i})">❌</button>`;
    container.appendChild(div);
  });

  document.getElementById("cart-total").textContent = total;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
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
