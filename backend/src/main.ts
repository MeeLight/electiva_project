import 'dotenv/config'
import express, { json, urlencoded } from 'express'

// Middlewares
import cors from 'cors'
import morgan from 'morgan'

// Routes
import router from '@routes/index'
import router404 from '@routes/404'

console.clear()
const app = express()

// Environment Variables
const PORT = +process.env.PORT!
const API_BASE_URI = process.env.API_BASE_URI!
const API_VERSION = process.env.API_VERSION!

// Middlewares
app.use(json())
app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))

// Router
app.use(`${API_BASE_URI}${API_VERSION}`, router)
app.use('*', router404)

app.listen(PORT, () => {
  console.log('Server on PORT:', PORT)
})
