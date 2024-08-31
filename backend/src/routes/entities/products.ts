import { Router } from 'express'
import ProductController from '@controllers/product.controller'

// Controllers
// import { productController } from '@controllers/product.controller'
const controller = new ProductController()
const router = Router()

router.get('/', controller.getProduct)
router.put('/', controller.getProduct)
export { router }
