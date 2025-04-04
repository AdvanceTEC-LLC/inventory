import { stockController } from '../controllers/index.js'
import { trace } from '../util/logger.js'
import BaseRouter from './classes/BaseRouter.js'

class StockRouter extends BaseRouter {
  constructor() {
    trace()
    super(stockController)
  }
}

export default StockRouter
