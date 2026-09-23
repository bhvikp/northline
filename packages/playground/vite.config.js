import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5174,
  },
  resolve: {
    alias: {
      // northline's package.json now points "." / "./theme.css" at its
      // built dist/ output (see its vite.config.ts), so a plain published-
      // package consumer needs `npm run build` before seeing changes. The
      // playground is northline's own dev environment, so it aliases
      // straight to source instead, keeping instant HMR on every edit.
      'northline/theme.css': fileURLToPath(new URL('../northline/src/theme.css', import.meta.url)),
      northline: fileURLToPath(new URL('../northline/src/index.ts', import.meta.url)),
    },
  },
})
