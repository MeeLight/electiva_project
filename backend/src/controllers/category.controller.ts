import { Category } from 'src/entities/category.entity'
import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { GetCategory } from 'src/DTO/getcategory';


export default class CategoryController {
    async getcategory(req: Request, res: Response) {
        try {
            const dto = GetCategory.create(req.query);
            const categories = await prisma.categoria.findMany({
                where:{
                    coocat: dto.coocat,
                    descripcion: dto.descripcion
                }
            })
            const results: Category[] = categories.map((element)=>{
                return Category.create(element);
            })
            res.status(200).json(results)
        }catch (error) {
            res.status(500).json({ message: 'Server Internal Serror' })
        }
    }
    async UpdateCategory(req: Request, res: Response) {
        try {
            const dto = Category.create(req.body);
            const result = prisma.categoria.update({where: {coocat: dto.coocat}, data: dto})
            res.status(200).json(result)
        }catch (error) {
            res.status(500).json({ message: 'Server Internal Serror' })
        }
    }
}
