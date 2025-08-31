document.getElementById("payment-form").addEventListener("submit", e => {
  e.preventDefault();
  let method = document.querySelector("input[name='method']:checked").value;
  localStorage.setItem("payment", method);
  window.location.href = "success.html";
});
