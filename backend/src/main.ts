import 'dotenv/config'
import express, { json, urlencoded } from 'express'

import { envConfig } from '@config/env'

// Middlewares
import cors from 'cors'
import morgan from 'morgan'

// Routes
import router from '@routes/index'
import router404 from '@routes/404'

console.clear()
const app = express()

// Middlewares
app.use(json())
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))

// Router
app.use(`${envConfig.api.baseUri}${envConfig.api.version}`, router)
app.use('*', router404)

app.listen(envConfig.server.port, () => {
  console.log('Server on PORT:', envConfig.server.port)
})
