window.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count++;
  localStorage.setItem("reviewCount", count);

  document.getElementById("reviewCount").textContent = count;
});
