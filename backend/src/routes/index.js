import { Router } from 'express'

import manufacturerRouter from './manufacturer.routes.js'

const router = Router()

router.use('/manufacturers', manufacturerRouter)

export default router
