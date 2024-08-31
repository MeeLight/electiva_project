import { Router } from 'express'
import CategoryController from '@controllers/category.controller'

const router = Router()
const categoryController = new CategoryController()

router.get('/', controller.getcategory);
router.put('/', controller.UpdateCategory);

export { router }
