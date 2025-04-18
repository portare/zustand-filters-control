import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['lib'] }),
  ],
    build: {
      lib: {
        entry: 'lib/main.ts',
        formats: ['es'],
      }
    }
})
