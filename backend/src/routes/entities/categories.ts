import { Router } from 'express'
import CategoryController from '@controllers/category.controller'

const controller = new CategoryController()

const router = Router()

router.get('/', controller.getcategory);
router.put('/', controller.UpdateCategory);
export { router }
