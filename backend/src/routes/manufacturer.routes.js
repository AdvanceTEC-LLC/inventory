import ManufacturerController from '../controllers/manufacturer.controller.js'
import BaseRouter from './BaseRouter.js'
import { trace } from '../util/logger.js'

const controller = new ManufacturerController()

class ManufacturerRouter extends BaseRouter {
  constructor() {
    trace()
    super(controller)

    this.router.route('/:name').get(controller.getByName)
    this.router.route('/bulk').post(controller.bulkCreate)
  }
}

export default ManufacturerRouter
