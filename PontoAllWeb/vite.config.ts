import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Essa opção deve ser a mesma que a definida em tsconfig.app.json
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
});
