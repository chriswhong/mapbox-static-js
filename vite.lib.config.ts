import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// Library build configuration
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src/lib',
      outDir: 'dist',
      include: ['src/lib/**/*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'MapboxStaticJS',
      formats: ['es', 'umd'],
      fileName: (format) => `mapbox-static-js.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  css: {
    modules: false
  }
})