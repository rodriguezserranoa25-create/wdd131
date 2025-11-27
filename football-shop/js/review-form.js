// review-form.js

window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("productName");

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
});
