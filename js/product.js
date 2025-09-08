import { productos } from "./data.js";

const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "hj_cart_count";

function getCartCount() {
  return parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}

function setCartCount(n) {
  localStorage.setItem(STORAGE_KEY, String(n));
  updateCartBadge(n);
}

function addToCart(by = 1) {
  const next = getCartCount() + by;
  setCartCount(next);
}

function updateCartBadge(n = getCartCount()) {
  const badge = $("cartCount");
  if (badge) {
    badge.textContent = n;
    badge.style.display = "inline-flex";
  }
}

function formatPrice(value) {
  const num = Number(value);
  if (Number.isFinite(num)) {
    return num.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  }
  return value;
}

function render(product) {
  $("heroImg").src = product.imagen;
  $("heroImg").alt = product.nombre + " — Hermanos Jota";
  $("title").textContent = product.nombre;
  $("desc").textContent = product.descripcion;
  $("priceValue").textContent = formatPrice(product.precio);

  const rows = [
    ["Medidas", product.medidas],
    ["Materiales", product.materiales],
    ["Acabado", product.acabado],
  ].filter(([, v]) => v);

  $("specsBody").innerHTML = rows
    .map(
      ([k, v]) => `
      <tr>
        <th>${k}</th>
        <td>${v}</td>
      </tr>`
    )
    .join("");

  const addBtn = $("btnAddToCart");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(1);
      addBtn.classList.add("added");
      setTimeout(() => addBtn.classList.remove("added"), 300);
    });
  }
}

const params = new URLSearchParams(location.search);
const id = params.get("id");
const product = productos.find((p) => p.id === id);

if (product) {
  render(product);
} else {
  location.replace("./products.html");
}

updateCartBadge();
