import { manufacturerController } from '../controllers/index.js'
import BaseRouter from './classes/BaseRouter.js'
import { trace } from '../util/logger.js'

class ManufacturerRouter extends BaseRouter {
  constructor() {
    trace()
    super(manufacturerController)

    this.router.route('/:name').get(manufacturerController.getByName)
    this.router.route('/bulk').post(manufacturerController.bulkCreate)
  }
}

export default ManufacturerRouter
