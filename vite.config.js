import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteSitemap from 'vite-plugin-sitemap';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    ViteSitemap({
      siteUrl: 'https://pdfversee.netlify.app',
      
      // Optional settings for the sitemap
      changefreq: 'daily', // Frequency of content changes
      priority: 0.7,       // Default priority (between 0.0 and 1.0)
      
      // Optional: You can specify paths to include or exclude
      exclude: [ '/GJWQ'], // Pages you don’t want to include in the sitemap
    }),
  ],
 
  
   build: {
    // Output directory for production build
    outDir: 'dist',
  },
})
