import { materialController } from '../controllers/index.js'
import BaseRouter from './classes/BaseRouter.js'
import { trace } from '../util/logger.js'

class MaterialRouter extends BaseRouter {
  constructor() {
    trace()
    super(materialController)

    this.router.route('/deep').post(materialController.deepCreate)
    this.router.route('/bulk').post(materialController.bulkCreate)
  }
}

export default MaterialRouter
