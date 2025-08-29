
import { productos } from './data.js';


// --- RENDER INICIAL ---
document.addEventListener('DOMContentLoaded', () => {
renderProducts(productos);
initSearch();
});


// --- BÚSQUEDA ---
export function initSearch() {
    const searchInput = document.getElementById('product-search');
    const searchButton = document.getElementById('searchbar-btn');

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

  actions.appendChild(seeBtn);
  actions.appendChild(addBtn);

  // Armar card
  card.appendChild(link);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(actions);

  return card;
}

