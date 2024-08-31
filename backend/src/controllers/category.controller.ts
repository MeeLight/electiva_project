import { type Request, type Response } from 'express'
import { PrismaClient } from '@prisma/client'

export default class CategoryController {
  #prismaClient: PrismaClient

  constructor() {
    this.#prismaClient = new PrismaClient()
  }

  async getCategories(_: Request, res: Response) {
    const categories = await this.#prismaClient.categoria.findMany()
    res.status(200).json(categories)
  }
}
