import BaseController from './classes/BaseController.js'
import { materialService } from '../services/index.js'
import deepCreate from './functions/deepCreate.js'
import bulkCreate from './functions/bulkCreate.js'
import { trace } from '../util/logger.js'

class MaterialController extends BaseController {
  constructor() {
    trace()
    super(materialService)

    this.deepCreate = deepCreate(materialService)
    this.bulkCreate = bulkCreate(materialService)
  }
}

export default MaterialController
