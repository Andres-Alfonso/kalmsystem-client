import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// const flowbite = require("flowbite-react/tailwind");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({target: 'react', autoCodeSplitting: true}),
    react(),
    tailwindcss(),
    // flowbite.plugin(),
  ],
})
