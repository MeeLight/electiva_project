import { vitePlugin as remix } from '@remix-run/dev'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { installGlobals } from '@remix-run/node'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

export default defineConfig({
  publicDir: './public',
  clearScreen: false,
  plugins: [
    tsconfigPaths(),
    remix({
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/product', './routes/product.$code.tsx', { index: false })
        })
      }
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './app')
    }
  },
  server: {
    host: true
  }
})
