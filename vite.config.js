import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000, // Optional: specify dev server port
    open: true    // Optional: open browser on start
  },
  build: {
    outDir: 'dist' // Ensures output directory is 'dist'
  }
});
