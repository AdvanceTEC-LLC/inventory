import { Router } from 'express'

import ManufacturerRouter from './manufacturer.routes.js'
import MaterialRouter from './material.routes.js'
import ProjectRouter from './project.routes.js'
import StockRouter from './stock.routes.js'

const router = Router()

router.use('/manufacturers', new ManufacturerRouter().getRouter())
router.use('/materials', new MaterialRouter().getRouter())
router.use('/projects', new ProjectRouter().getRouter())
router.use('/stock', new StockRouter().getRouter())

export default router
