import BaseController from './classes/BaseController.js'
import { manufacturerService } from '../services/index.js'
import bulkCreate from './functions/bulkCreate.js'
import getByName from './functions/getByName.js'
import { trace } from '../util/logger.js'

class ManufacturerController extends BaseController {
  constructor() {
    trace()
    super(manufacturerService)

    this.getByName = getByName(manufacturerService)
    this.bulkCreate = bulkCreate(manufacturerService)
  }
}

export default ManufacturerController
