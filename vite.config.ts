import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  envDir: '../',
  envPrefix: ['SCOS', 'STORE', 'ORYX'],
  define: {
    'import.meta.env.SCOS_BASE_URL':`"${process.env.SCOS_BASE_URL ?? process.env.ORYX_FALLBACK_SCOS_BASE_URL}"`
  },
  plugins: [
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
})
