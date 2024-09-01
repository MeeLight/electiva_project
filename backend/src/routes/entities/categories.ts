import { Router } from 'express'
import CategoryController from '@controllers/category.controller'

const router = Router()
const controller = new CategoryController()

router.get('/', controller.getCategory)
router.patch('/', controller.updateCategory)

export { router }
