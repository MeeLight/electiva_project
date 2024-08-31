import { Router, type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'

// Controllers
// import { categoryController } from '@controllers/category.controller'

const router = Router()
const prismaClient = new PrismaClient()

router.get('/', async (_: Request, res: Response) => {
  const categories = await prismaClient.categoria.findMany()

  res.status(200).json(categories)
})

export { router }
