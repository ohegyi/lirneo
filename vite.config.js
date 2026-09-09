import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import prerender from 'vite-prerender-plugin'

export default defineConfig({
  plugins: [
    tailwindcss(),
    
    prerender({ renderTarget: '#root', prerenderScript: './prerender.js', }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})