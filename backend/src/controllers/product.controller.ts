import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export default class ProductController {
  async getProducts(_: Request, res: Response) {
    try {
      const products = await prismaClient.producto.findMany()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: 'Server Internal Serror' })
    }
  }
}
