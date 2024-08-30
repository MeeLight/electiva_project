import { Router, type Request, type Response } from 'express'

// Controllers
// import { productController } from '@controllers/product.controller'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.status(200).json([
    {
      codigo: '12345677',
      nombre: 'Item 1',
      descripcion: '¡Allahu Akbar! 1',
      cantidad: 100.12,
      stockmax: 10,
      strockmin: 5,
      precio: 1.5,
      codcat: '1'
    },
    {
      codigo: '12345678',
      nombre: 'Item 2',
      descripcion: '¡Allahu Akbar! 2',
      cantidad: 175.63,
      stockmax: 20,
      strockmin: 15,
      precio: 3.00,
      codcat: '2'
    },
  ])
})

export { router }
