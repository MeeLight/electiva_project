import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { GetProduct } from 'src/DTO/getproduct'
import { Product } from 'src/entities/producto.entity'

export default class ProductController {
  async getProduct(req: Request, res: Response) {
    try {
      const dto = GetProduct.create(req.query)
      const categories = await prisma.producto.findMany({
        where: {
          codigo: dto.codigo,
          codcat: dto.codcat
        }
      })
      const results: Product[] = categories.map(element => {
        return Product.create(element)
      })
      res.status(200).json(results)
    } catch (error) {
      res.status(500).json({ message: 'Server Internal Serror' })
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const { body, query } = req
      const codigo: any = query.codigo || ''

      const result = await prisma.producto.update({
        where: { codigo },
        data: {
          codigo: body.code,
          nombre: body.name,
          descripcion: body.description,
          cantidad: body.quantity,
          stockmin: body.stockMin,
          stockmax: body.stockMax,
          precio: body.price,
          codcat: body.categoryCode
        }
      })
      
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Internal Serror' })
    }
  }
}
