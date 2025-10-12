import{p,a as v,t as f,g as y}from"./cart-COJ-hvxc.js";/* empty css              */const o=a=>document.querySelector(a),l=a=>`$${a}`,g="+52 55 1234 5678",$=new URLSearchParams(location.search),u=$.get("id"),i=o("#product"),w=o("#related"),k=o("#backToCat"),t=p.find(a=>a.id===u);if(!t)i.innerHTML=`
    <div class="md:col-span-2 text-center py-20">
      <h1 class="text-3xl font-extrabold">Producto no encontrado</h1>
      <p class="mt-2 text-neutral-600">No existe un producto con id <code class="px-1.5 py-0.5 rounded bg-neutral-100">${u}</code></p>
      <a href="./menu.html" class="mt-6 inline-block text-primary font-semibold hover:underline">Ver menú completo</a>
    </div>
  `;else{k.href=`./menu.html?cat=${t.category}`,i.innerHTML=`
    <div>
      <img src="${t.img}" alt="${t.name}"
           class="w-full rounded-xl object-cover max-h-[520px] shadow-sm">
    </div>

    <div>
      <h1 class="text-4xl font-extrabold">${t.name}</h1>
      <p class="mt-2 text-primary text-3xl font-black" id="price">${l(t.price)}</p>

      ${t.desc?`
        <p class="mt-4 text-neutral-700">${t.desc}</p>
      `:""}

      ${Array.isArray(t.options)&&t.options.length?`
        <div class="mt-6">
          <h3 class="font-semibold mb-2">Extras / Opciones</h3>
          <div id="options" class="flex flex-wrap gap-2">
            ${t.options.map(e=>`
              <label class="inline-flex items-center gap-2 border rounded-full px-3 py-1 cursor-pointer">
                <input class="addon" type="checkbox" value="${e.value}" data-plus="${e.plus||0}">
                <span>${e.label}${e.plus?` (+${l(e.plus)})`:""}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `:""}

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
  `;const a=o("#qty");o("#inc").onclick=()=>a.value=(+a.value||1)+1,o("#dec").onclick=()=>a.value=Math.max(1,(+a.value||1)-1);const m=o("#price"),d=t.price,h=()=>{const r=[...document.querySelectorAll(".addon:checked")].reduce((s,c)=>s+(+c.dataset.plus||0),0);m.textContent=l(d+r)};document.querySelectorAll(".addon").forEach(e=>e.addEventListener("change",h)),o("#add").onclick=()=>{const e=Math.max(1,+a.value||1),r=[...document.querySelectorAll(".addon:checked")].map(n=>({value:n.value,plus:+n.dataset.plus||0})),s=r.reduce((n,x)=>n+x.plus,0),c=d+s;v({id:t.id,name:t.name+(r.length?` (${r.map(n=>n.value).join(", ")})`:""),price:c},e),alert("Agregado al carrito ✅")},o("#wa").onclick=()=>{const e=f(g,y());window.open(e,"_blank")};const b=p.filter(e=>e.category===t.category&&e.id!==t.id).slice(0,4);w.innerHTML=b.map(e=>`
    <a href="./product.html?id=${e.id}"
       class="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <img src="${e.img}" alt="${e.name}" class="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105">
      <div class="p-3 text-center">
        <h3 class="text-sm font-semibold">${e.name}</h3>
        <p class="text-primary font-bold">${l(e.price)}</p>
      </div>
    </a>
  `).join("")}
