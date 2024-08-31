import { Router, type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Controllers
// import { productController } from '@controllers/product.controller'

const router = Router()
const prismaClient = new PrismaClient()

router.get('/', async (_: Request, res: Response) => {
  const products = await prismaClient.producto.findMany()

  res.status(200).json(products)
})

export { router }
