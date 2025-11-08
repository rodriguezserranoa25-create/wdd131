// temples.js
const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("show");
  menuButton.textContent = nav.classList.contains("show") ? "✖" : "☰";
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
