import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  
  server:
  {
    
    proxy:
    {
      '/api/v1': 'https://video-tube-34ly-50kcudvw8-hassanali240489-4130s-projects.vercel.app/'
    }
  },
  plugins: [
    tailwindcss(),
  ],
})