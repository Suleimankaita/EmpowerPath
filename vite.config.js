import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl' // 1. Import the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // basicSsl(), // 2. Add the plugin here
    react(),
  ],
  // server: {
  //   host: true, // Allows access via network IP
  //   https: true, // 3. Force HTTPS for Geolocation permission
  // }
})