import MaterialController from '../controllers/material.controller.js'
import BaseRouter from './classes/BaseRouter.js'
import { trace } from '../util/logger.js'

const controller = new MaterialController()

class MaterialRouter extends BaseRouter {
  constructor() {
    trace()
    super(controller)

    this.router.route('/deep').post(controller.deepCreate)
    this.router.route('/bulk').post(controller.bulkCreate)
  }
}

export default MaterialRouter
