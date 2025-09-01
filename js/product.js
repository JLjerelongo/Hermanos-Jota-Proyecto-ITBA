import { productos } from "./data.js"

const $ = (id) => document.getElementById(id)

function formatPrice(value) {
  const num = Number(value)
  if (Number.isFinite(num)) {
    return num.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    })
  }
  return value
}

function render(product) {
  $("heroImg").src = product.imagen
  $("heroImg").alt = product.nombre + " — Hermanos Jota"
  $("title").textContent = product.nombre
  $("desc").textContent = product.descripcion
  $("priceValue").textContent = formatPrice(product.precio)

  const rows = [
    ["Medidas", product.medidas],
    ["Materiales", product.materiales],
    ["Acabado", product.acabado],
  ].filter(([, v]) => v)

  $("specsBody").innerHTML = rows
    .map(
      ([k, v]) => `
      <tr>
        <th>${k}</th>
        <td>${v}</td>
      </tr>`
    )
    .join("")

  const asunto = encodeURIComponent(`Consulta por ${product.nombre}`)
  const cuerpo = encodeURIComponent(
    `Hola Hermanos Jota,\n\nMe interesa el producto "${product.nombre}" (ID: ${product.id}). ¿Podrían enviarme más información?\n\n¡Gracias!`
  )
  $("btnConsultar").href = `mailto:info@hermanosjota.com.ar?subject=${asunto}&body=${cuerpo}`
}

const params = new URLSearchParams(location.search)
const id = params.get("id")
const product = productos.find((p) => p.id === id)

if (product) {
  render(product)
} else {
  location.replace("./products.html")
}
