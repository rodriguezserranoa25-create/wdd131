// products.js

// Array of product objects
const PRODUCTS = [
  {
    id: "shirt-001",
    name: "Home Replica Shirt – Red City",
    team: "Red City FC",
    type: "replica",
    price: 39.99,
    img: "images/shirt-1.jpg",
    desc: "Official-style home replica shirt inspired by Red City. Lightweight and breathable."
  },
  {
    id: "shirt-002",
    name: "Away Fan Tee – Blue United",
    team: "Blue United",
    type: "fan",
    price: 22.5,
    img: "images/shirt-2.jpg",
    desc: "Soft cotton fan T-shirt for everyday wear. Perfect for match day or casual outfits."
  },
  {
    id: "shirt-003",
    name: "Retro Classic – Golden Stripes",
    team: "Golden Stripes",
    type: "fan",
    price: 29.9,
    img: "images/shirt-3.jpg",
    desc: "Retro style shirt with a classic look and stitched crest."
  }
];

// Render grid of products into a container element
function renderProductsGrid(container, filter = "all", query = "") {
  if (!container) return;

  const searchTerm = query.trim().toLowerCase();

  const filtered = PRODUCTS.filter((product) => {
    const matchType = filter === "all" ? true : product.type === filter;
    const matchSearch =
      searchTerm === ""
        ? true
        : `${product.name} ${product.team}`
            .toLowerCase()
            .includes(searchTerm);

    return matchType && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p>No products found.</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (p) => `
      <article class="product-card">
        <img src="${p.img}" alt="${p.name} – ${p.team}" loading="lazy">
        <h3>${p.name}</h3>
        <p class="muted">${p.team} · ${p.type}</p>
        <p class="price">€${p.price.toFixed(2)}</p>
        <div class="actions">
          <a class="btn" href="product.html?id=${p.id}">View</a>
          <button class="btn add-to-cart-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </article>
    `
    )
    .join("");

  // Attach event listeners to "Add to cart" buttons
  container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.dataset.id;
      addToCart(id, 1);
      updateCartCountUI();
    });
  });
}

// Render a single product on product.html
function renderSingleProduct(container) {
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = `<p>Product not specified.</p>`;
    return;
  }

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    container.innerHTML = `<p>Product not found.</p>`;
    return;
  }

  container.innerHTML = `
    <article class="product-detail">
      <img src="${product.img}" alt="${product.name}" loading="lazy">
      <div>
        <h1>${product.name}</h1>
        <p class="muted">${product.team} – ${product.type}</p>
        <p>${product.desc}</p>
        <p class="price">€${product.price.toFixed(2)}</p>
        <label for="qty">Quantity</label>
        <input id="qty" type="number" min="1" value="1">
        <button id="add-product" class="btn">Add to cart</button>
      </div>
    </article>
  `;

  const addButton = document.getElementById("add-product");
  const qtyInput = document.getElementById("qty");

  addButton.addEventListener("click", () => {
    const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    addToCart(product.id, qty);
    updateCartCountUI();
    alert(`${product.name} added to cart.`);
  });
}

// Make products available globally if needed
window.GOAL_PRODUCTS = PRODUCTS;
