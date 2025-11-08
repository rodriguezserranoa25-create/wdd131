// Footer dynamic info
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  // Change symbol when toggled
  if (navMenu.classList.contains("show")) {
    menuButton.textContent = "✕"; // close symbol
  } else {
    menuButton.textContent = "☰"; // open symbol
  }
});
