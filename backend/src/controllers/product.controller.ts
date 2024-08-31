
import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { GetProduct } from 'src/DTO/getproduct';
import { Product } from 'src/entities/producto.entity';


export default class ProductController {
    async getProduct(req: Request, res: Response) {
        try {
            const dto = GetProduct.create(req.query);
            const categories = await prisma.producto.findMany({
                where:{
                    codigo: dto.codigo,
                    codcat: dto.coocat
                }
            })
            const results: Product[] = categories.map((element)=>{
                return Product.create(element);
            })
            res.status(200).json(results)
        }catch (error) {
            res.status(500).json({ message: 'Server Internal Serror' })
        }
    }
    async UpdateProduct(req: Request, res: Response) {
        try {
            const dto = Product.create(req.body);
            const result = prisma.producto.update({where: {codigo: dto.codigo}, data: dto})
            res.status(200).json(result)
        }catch (error) {
            res.status(500).json({ message: 'Server Internal Serror' })
        }
    }
}