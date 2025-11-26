// cart.js

const CART_KEY = "goalgear_cart";

// Read cart from localStorage
function getCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }

  saveCart(cart);
}

// Update quantity (or remove if qty <= 0)
function updateCartItem(productId, qty) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) return;

  if (qty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].qty = qty;
  }

  saveCart(cart);
}

// Clear entire cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// Get total item count
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.qty, 0);
}

// Render cart table
function renderCart(container, summaryContainer) {
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    if (summaryContainer) summaryContainer.innerHTML = "";
    return;
  }

  const rows = cart
    .map((item) => {
      const product =
        window.GOAL_PRODUCTS.find((p) => p.id === item.id) || null;

      if (!product) {
        return "";
      }

      const lineTotal = product.price * item.qty;

      return `
        <tr data-id="${item.id}">
          <td>${product.name}</td>
          <td>
            <input
              type="number"
              class="cart-qty"
              min="0"
              value="${item.qty}"
              aria-label="Quantity for ${product.name}"
            >
          </td>
          <td>€${product.price.toFixed(2)}</td>
          <td>€${lineTotal.toFixed(2)}</td>
          <td><button class="remove-btn">Remove</button></td>
        </tr>
      `;
    })
    .join("");

  container.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  // Attach events to qty inputs and remove buttons
  container.querySelectorAll(".cart-qty").forEach((input) => {
    input.addEventListener("change", (event) => {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      const newQty = parseInt(event.target.value, 10) || 0;
      updateCartItem(id, newQty);
      renderCart(container, summaryContainer);
      updateCartCountUI();
    });
  });

  container.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const row = event.target.closest("tr");
      const id = row.dataset.id;
      updateCartItem(id, 0);
      renderCart(container, summaryContainer);
      updateCartCountUI();
    });
  });

  if (summaryContainer) {
    const total = getCartTotal();
    summaryContainer.innerHTML = `
      <div class="cart-summary-total">Total: €${total.toFixed(2)}</div>
      <button id="clear-cart" class="btn">Clear cart</button>
    `;

    document
      .getElementById("clear-cart")
      .addEventListener("click", () => {
        clearCart();
        renderCart(container, summaryContainer);
        updateCartCountUI();
      });
  }
}

// Calculate total price
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product =
      window.GOAL_PRODUCTS.find((p) => p.id === item.id) || null;
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);
}
