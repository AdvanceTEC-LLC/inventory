import { Router } from 'express'

import ManufacturerRouter from './manufacturer.routes.js'
import MaterialRouter from './material.routes.js'
import ProjectRouter from './project.routes.js'

const router = Router()

router.use('/manufacturers', new ManufacturerRouter().getRouter())
router.use('/materials', new MaterialRouter().getRouter())
router.use('/projects', new ProjectRouter().getRouter())

export default router
