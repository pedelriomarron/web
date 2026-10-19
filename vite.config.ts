import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works under https://pedelriomarron.github.io/web
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
