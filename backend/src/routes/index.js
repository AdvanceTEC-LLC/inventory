import { Router } from 'express'

import manufacturerRouter from './manufacturer.routes.js'
import materialRouter from './material.routes.js'

const router = Router()

router.use('/manufacturers', manufacturerRouter)
router.use('/materials', materialRouter)

export default router
