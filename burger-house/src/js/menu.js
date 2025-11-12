import products from '../data/products.json'
import { addToCart, getCart, toWhatsAppLink } from './cart.js'

const CATS = [
  { key:'all',     label:'Todos' },
  { key:'burgers', label:'Hamburguesas' },
  { key:'hotdogs', label:'Hot Dogs' },
  { key:'shakes',  label:'Malteadas' },
  { key:'drinks',  label:'Bebidas' },
  { key:'fries',   label:'Papas' },
  { key:'snacks',  label:'Snacks' }
]

const params = new URLSearchParams(location.search)
const cat = params.get('cat') || 'all'

const title = document.querySelector('#title')
const grid  = document.querySelector('#grid')
const tpl   = document.querySelector('#card-template')
const nav   = document.querySelector('#cat-nav')

const select = document.createElement('select')
select.className = 'border border-primary/30 rounded-full px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary'

/*
// nav de categorías sin select
CATS.forEach(c => {
  const a = document.createElement('a')
  a.href = c.key === 'all' ? 'menu.html' : `menu.html?cat=${c.key}`
  a.textContent = c.label
  a.className = `px-4 py-2 rounded-full text-sm border transition
    ${c.key === cat ? 'bg-primary text-white border-primary' : 'border-primary/30 hover:bg-primary/10'}`
  nav.appendChild(a)
})
*/

// nav de categorías con select
CATS.forEach(c => {
  const option = document.createElement('option')
  option.value = c.key
  option.textContent = c.label
  if (c.key === cat) option.selected = true
  select.appendChild(option)
})

// Insertar el select al nav
nav.appendChild(select)

// Detectar cambio de categoría
select.addEventListener('change', (e) => {
  const value = e.target.value
  const url = value === 'all' ? 'menu.html' : `menu.html?cat=${value}`
  location.href = url
})



// título dinámico
const current = CATS.find(c => c.key === cat) || CATS[0]
title.textContent = current.label

// filtro
const list = products.filter(p => cat === 'all' ? true : p.category === cat)

// render
function money(n){ return `$${n}` }

list.forEach(p => {
  const node = tpl.content.cloneNode(true)

  const card = node.querySelector('a')
  const img  = node.querySelector('img')
  const name = node.querySelector('.name')
  const price= node.querySelector('.price')
  const btn  = node.querySelector('.add-btn')

  img.src = p.img
  img.alt = p.name
  name.textContent = p.name
  price.textContent = money(p.price)

  // linkea al detalle si vas a usar product.html:
  card.href = `product.html?id=${p.id}`

  // botón agregar al carrito (si usas cart.js)
  btn.addEventListener('click', (e) => {
    e.preventDefault() // para no navegar si dan click al botón
    addToCart({ id:p.id, name:p.name, price:p.price }, 1)
  })

  grid.appendChild(node)
})

// WhatsApp checkout
document.querySelector('#checkout').addEventListener('click', () => {
  const url = toWhatsAppLink('+524424407697', getCart())
  window.open(url, '_blank')
})
