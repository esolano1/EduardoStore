import products from '../data/products.json'
import { addToCart, getCart, toWhatsAppLink } from './cart.js'

// Helpers
const $ = s => document.querySelector(s)
const money = n => `$${n}`
const phone = '+52 55 1234 5678' // TODO: tu número real

// Leer id y producto
const params = new URLSearchParams(location.search)
const id = params.get('id')

const container = $('#product')
const relatedGrid = $('#related')
const backToCat = $('#backToCat')

const product = products.find(p => p.id === id)

// Si no hay producto → 404 simple
if (!product) {
  container.innerHTML = `
    <div class="md:col-span-2 text-center py-20">
      <h1 class="text-3xl font-extrabold">Producto no encontrado</h1>
      <p class="mt-2 text-neutral-600">No existe un producto con id <code class="px-1.5 py-0.5 rounded bg-neutral-100">${id}</code></p>
      <a href="./menu.html" class="mt-6 inline-block text-primary font-semibold hover:underline">Ver menú completo</a>
    </div>
  `
} else {
  // Link “volver al menú” con la categoría del producto
  backToCat.href = `./menu.html?cat=${product.category}`

  // Render principal
  container.innerHTML = `
    <div>
      <img src="${product.img}" alt="${product.name}"
           class="w-full rounded-xl object-cover max-h-[520px] shadow-sm">
    </div>

    <div>
      <h1 class="text-4xl font-extrabold">${product.name}</h1>
      <p class="mt-2 text-primary text-3xl font-black" id="price">${money(product.price)}</p>

      ${product.desc ? `
        <p class="mt-4 text-neutral-700">${product.desc}</p>
      ` : ''}

      ${Array.isArray(product.options) && product.options.length ? `
        <div class="mt-6">
          <h3 class="font-semibold mb-2">Extras / Opciones</h3>
          <div id="options" class="flex flex-wrap gap-2">
            ${product.options.map(opt => `
              <label class="inline-flex items-center gap-2 border rounded-full px-3 py-1 cursor-pointer">
                <input class="addon" type="checkbox" value="${opt.value}" data-plus="${opt.plus || 0}">
                <span>${opt.label}${opt.plus ? ` (+${money(opt.plus)})` : ''}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="mt-6 flex items-center gap-3">
        <button id="dec" class="size-9 rounded-full border hover:bg-neutral-100">-</button>
        <input id="qty" type="number" value="1" min="1" class="w-16 text-center border rounded py-1">
        <button id="inc" class="size-9 rounded-full border hover:bg-neutral-100">+</button>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <button id="add" class="rounded-full bg-primary px-6 py-3 text-white font-bold hover:opacity-90">
          Agregar al carrito
        </button>
        <button id="wa" class="rounded-full border border-primary px-6 py-3 font-bold text-primary hover:bg-primary/10">
          Pedir por WhatsApp
        </button>
      </div>
    </div>
  `

  // Lógica cantidad
  const qtyInput = $('#qty')
  $('#inc').onclick = () => qtyInput.value = (+qtyInput.value || 1) + 1
  $('#dec').onclick = () => qtyInput.value = Math.max(1, (+qtyInput.value || 1) - 1)

  // Recalcular precio con extras
  const priceEl = $('#price')
  const base = product.price
  const updatePrice = () => {
    const addons = [...document.querySelectorAll('.addon:checked')]
    const extra = addons.reduce((s, el) => s + (+el.dataset.plus || 0), 0)
    priceEl.textContent = money(base + extra)
  }
  document.querySelectorAll('.addon').forEach(el => el.addEventListener('change', updatePrice))

  // Agregar al carrito
  $('#add').onclick = () => {
    const qty = Math.max(1, +qtyInput.value || 1)

    // Capturar extras seleccionados (opcional, útil si luego quieres verlos en WhatsApp)
    const selected = [...document.querySelectorAll('.addon:checked')].map(el => ({
      value: el.value, plus: +el.dataset.plus || 0
    }))

    // Para simplificar, sumamos los extras al precio unitario
    const extra = selected.reduce((s, x) => s + x.plus, 0)
    const finalUnitPrice = base + extra

    addToCart({
      id: product.id,
      name: product.name + (selected.length ? ` (${selected.map(s => s.value).join(', ')})` : ''),
      price: finalUnitPrice
    }, qty)

    alert('Agregado al carrito ✅')
  }

  // WhatsApp inmediato (usa el carrito actual)
  $('#wa').onclick = () => {
    const url = toWhatsAppLink(phone, getCart())
    window.open(url, '_blank')
  }

  // Render relacionados (misma categoría, máx 4)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  relatedGrid.innerHTML = related.map(r => `
    <a href="./product.html?id=${r.id}"
       class="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <img src="${r.img}" alt="${r.name}" class="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105">
      <div class="p-3 text-center">
        <h3 class="text-sm font-semibold">${r.name}</h3>
        <p class="text-primary font-bold">${money(r.price)}</p>
      </div>
    </a>
  `).join('')
}
