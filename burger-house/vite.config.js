import { defineConfig } from 'vite'

export default defineConfig({
  base: '/EduardoStore/', //
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        menu: 'menu.html',
        product: 'product.html',
      },
    },
  },
})
