document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();

  let address = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    zip: document.getElementById("zip").value
  };

  localStorage.setItem("address", JSON.stringify(address));
  window.location.href = "payment.html";
});
