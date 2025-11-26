// main.js

// Toggle mobile navigation
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const navList = document.getElementById("nav-list");

  if (!toggle || !navList) return;

  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("show");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Update year in footer for all pages
function updateYearSpans() {
  const year = new Date().getFullYear();
  ["year", "year-products", "year-cart", "year-contact", "year-product"]
    .map((id) => document.getElementById(id))
    .filter((el) => el)
    .forEach((el) => (el.textContent = year));
}

// Update cart count in nav
function updateCartCountUI() {
  const span = document.getElementById("cart-count");
  if (!span) return;
  const count = getCartCount();
  span.textContent = `(${count})`;
}

// Initialise products page
function initProductsPage() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");

  function update() {
    const filter = filterSelect ? filterSelect.value : "all";
    const query = searchInput ? searchInput.value : "";
    renderProductsGrid(grid, filter, query);
  }

  if (searchInput) {
    searchInput.addEventListener("input", update);
  }
  if (filterSelect) {
    filterSelect.addEventListener("change", update);
  }

  update(); // initial render
}

// Initialise product detail page
function initProductPage() {
  const detail = document.getElementById("product-detail");
  if (!detail) return;
  renderSingleProduct(detail);
}

// Initialise cart page
function initCartPage() {
  const container = document.getElementById("cart-contents");
  const summary = document.getElementById("cart-summary");
  if (!container) return;
  renderCart(container, summary);
}

// Initialise contact form
function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all fields.";
      feedback.style.color = "red";
      return;
    }

    // Example: store last contact info in localStorage
    const contactData = { name, email, message, date: new Date().toISOString() };
    localStorage.setItem("goalgear_last_contact", JSON.stringify(contactData));

    feedback.textContent = "Thank you for your message! (Demo only – no email sent.)";
    feedback.style.color = "green";
    form.reset();
  });
}

// Global init
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  updateYearSpans();
  updateCartCountUI();
  initProductsPage();
  initProductPage();
  initCartPage();
  initContactForm();
});
