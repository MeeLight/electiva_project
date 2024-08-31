import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export default class CategoryController {
  async getCategories(_: Request, res: Response) {
    try {
      const categories = await prismaClient.categoria.findMany()
      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ message: 'Server Internal Serror' })
    }
  }
}
