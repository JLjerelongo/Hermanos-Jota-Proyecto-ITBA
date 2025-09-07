
import { productos as productos } from './data.js';


// --- RENDER INICIAL ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(productos);
  initSearch();
  updateCartBadge(getCartCount());
});


// --- BÚSQUEDA ---
export function initSearch() {
    const form = document.querySelector('.searchbar');
    const searchInput = document.getElementById('product-search');
    const searchButton = document.getElementById('product-search-btn');

    if (searchInput && searchButton) {

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
        renderProducts(productos);
        return;
        }

        const filtered = productos.filter((p) =>
        p.nombre.toLowerCase().includes(query)
        );

        renderProducts(filtered);
    });

    // Click en botón Buscar
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();

        const filtered = query
        ? productos.filter((p) => p.nombre.toLowerCase().includes(query))
        : productos;

        renderProducts(filtered);
    });

     // Submit por click en botón o Enter
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      const list = query ? productos.filter(p => p.nombre.toLowerCase().includes(query)) : productos;
      renderProducts(list);
    });

    // Enter en el input = click en el botón
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
        }
    });
    }

}

// --- RENDER DE PRODUCTOS ---
export function renderProducts(list) {
  try {
    const productsContainer = document.querySelector('.products-grid-container');
    if (!productsContainer) return;

    productsContainer.innerHTML = '';

    // Si no hay productos
    if (!list || list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'products-empty';
      empty.setAttribute('role', 'status');
      empty.setAttribute('aria-live', 'polite');
      empty.innerHTML = `
        <div class="products-empty-content">
          <h4>No se encontraron productos</h4>
        </div>
      `;
      productsContainer.appendChild(empty);
      return;
    }

    list.forEach((product) => {
      const card = renderProduct(product);
      productsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al renderizar productos:", error);
  }
}

function renderProduct(product) {
  const card = document.createElement('article');
  card.classList.add('products-card');
  card.dataset.id = product.id;
  card.dataset.price = product.precio ?? '';

  // Link a detalle
  const link = document.createElement('a');
  link.href = `./product.html?id=${encodeURIComponent(product.id)}`;
  link.classList.add('products-link');
  link.setAttribute('aria-label', `Ver ${product.nombre}`);

  // Imagen
  const img = document.createElement('img');
  img.src = product.imagen;
  img.alt = `Imagen de ${product.nombre}`;
  img.classList.add('products-image');

  // Título
  const name = document.createElement('h4');
  name.textContent = product.nombre;
  name.classList.add('products-name');

  link.appendChild(img);
  link.appendChild(name);

  // Descripción
  const description = document.createElement('p');
  description.textContent = product.descripcion;
  description.classList.add('products-description');

  // Precio
  const price = document.createElement('span');
  price.textContent = `$${Number(product.precio || 0).toLocaleString('es-AR')}`;
  price.classList.add('products-price');

  // Acciones
  const actions = document.createElement('div');
  actions.classList.add('products-actions');

  const seeBtn = document.createElement('a');
  seeBtn.href = `./product.html?id=${encodeURIComponent(product.id)}`;
  seeBtn.classList.add('btn', 'btn-see-product');
  seeBtn.textContent = 'Ver producto';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.classList.add('btn', 'btn-add-cart');
  addBtn.textContent = 'Agregar al carrito';

  // Evento Agregar al carrito
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(1);
      addBtn.classList.add("added");
      setTimeout(() => addBtn.classList.remove("added"), 300);
    });
  }

  actions.appendChild(seeBtn);
  actions.appendChild(addBtn);

  // Armar card
  card.appendChild(link);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(actions);

  return card;
}


// --- CARRITO ---
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

  

