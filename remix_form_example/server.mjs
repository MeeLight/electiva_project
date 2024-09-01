import 'dotenv/config.js'

// Remix and Express
import { createRequestHandler } from '@remix-run/express'
import { installGlobals } from '@remix-run/node'
import express, { static as static_, json, urlencoded } from 'express'

// Middlewares
import cors from 'cors'
import morgan from 'morgan'

console.clear()
installGlobals()

const app = express()
const NOVE_ENV = process.env.NODE_ENV || 'development'
const PORT = +process.env.PORT || 8082

const viteDevServer =
  NOVE_ENV === 'production' ? undefined : (
    await import('vite').then(vite =>
      vite.createServer({ server: { middlewareMode: true } })
    )
  )

// Handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares)
} else {
  app.use(
    '/assets',
    static_('build/client/assets', {
      immutable: true,
      maxAge: '1y'
    })
  )
}

app.use(static_('build/client', { maxAge: '1h' }))

// Middlewares
app.use(cors())
app.use(json())
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))

// Handle SSR requests
app.all(
  '*',
  createRequestHandler({
    build:
      viteDevServer ?
        () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
      : await import('./build/server/index.js')
  })
)

// Run 🚀
app.listen(PORT, () => console.log('Server on port', PORT))
