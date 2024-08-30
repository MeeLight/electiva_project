import { Router, type Request, type Response } from 'express'

// Controllers
// import { categoryController } from '@controllers/category.controller'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.status(200).json([
    {
      coocat: '1',
      descripcion: '¡Allahu Akbar! x1'
    },
    {
      coocat: '2',
      descripcion: '¡Allahu Akbar! x2'
    }
  ])
})

export { router }
