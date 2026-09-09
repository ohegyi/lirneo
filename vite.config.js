import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vitePrerender from 'vite-plugin-prerender' 
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    
    vitePrerender({ staticDir: path.join(__dirname, 'dist'),routes:['/']})
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})