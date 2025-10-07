let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure each item has quantity
cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<tr><td colspan='5'>Your cart is empty!</td></tr>";
        document.getElementById("cart-total").textContent = "0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" style="width:50px;" onchange="updateQuantity(${i}, this.value)">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${i})">❌</button></td>
        `;
        container.appendChild(row);
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);
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
    cart = [];
    renderCart();
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
