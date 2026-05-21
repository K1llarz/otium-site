import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'motion', test: /[\\/]node_modules[\\/]motion/ },
            { name: 'i18n', test: /[\\/]node_modules[\\/](i18next|react-i18next)/ },
            { name: 'router', test: /[\\/]node_modules[\\/]react-router/ },
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
