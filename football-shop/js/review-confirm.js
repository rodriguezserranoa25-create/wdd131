// review-confirm.js

window.addEventListener("DOMContentLoaded", () => {
  const count = Number(localStorage.getItem("reviewCount")) || 0;
  const newCount = count + 1;
  localStorage.setItem("reviewCount", newCount);

  document.getElementById("reviewCount").textContent = newCount;
});
