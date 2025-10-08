// src/js/cart.js
const KEY = 'ta_cart';

export function getCart() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function saveCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const i = cart.findIndex(it => it.id === product.id);
  if (i >= 0) cart[i].qty += qty;
  else cart.push({ id: product.id, name: product.name, price: product.price, qty });
  saveCart(cart);
}

export function clearCart() { saveCart([]); }

export function toWhatsAppLink(phone, cart) {
  const digits = phone.replace(/\D/g, '');
  if (!cart.length) return `https://wa.me/${digits}`;
  const lines = cart.map(it => `• ${it.name} x${it.qty} — $${it.price * it.qty}`);
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const msg = `Hola! Quiero ordenar:\n${lines.join('\n')}\n\nTotal: $${total}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
