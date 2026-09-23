import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Library-mode build: compiles src/ to dist/ as an ES module + .d.ts
// declarations, so Northline can be consumed as a normal published/built
// package instead of only working via raw-source workspace symlink.
// theme.css stays a separate asset (Vite extracts CSS imported by JS into
// its own file in lib mode) - consumers still import it explicitly, same
// as the raw-source setup documented in the README.
export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: false, insertTypesEntry: true, include: ['src'] }),
  ],
  build: {
    lib: {
      entry: new URL('src/index.ts', import.meta.url).pathname,
      formats: ['es'],
      fileName: () => 'index.js',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'chart.js', 'react-chartjs-2', 'chartjs-plugin-datalabels'],
      output: {
        assetFileNames: (info) => {
          const name = info.names?.[0] ?? info.name ?? ''
          return name.endsWith('.css') ? 'theme.css' : 'assets/[name][extname]'
        },
      },
    },
    sourcemap: true,
  },
})
