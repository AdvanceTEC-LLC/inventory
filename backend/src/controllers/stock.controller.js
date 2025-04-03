import BaseController from './classes/BaseController.js'
import { stockService } from '../services/index.js'
import { trace } from '../util/logger.js'
import deepCreate from './functions/deepCreate.js'

class StockController extends BaseController {
  constructor() {
    trace()
    super(stockService)

    this.deepCreate = deepCreate(stockService)
  }
}

export default StockController
