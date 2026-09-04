import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [tanstackRouter(), tailwindcss(), viteReact()],
  server: {
    port: 4004
  },
})

export default config
