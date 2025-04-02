import { Router } from 'express'
import { trace } from '../util/logger'

class BaseRouter {
  constructor(controller) {
    trace()
    this.router = Router()
    this.defaultRoutes(controller)
  }

  defaultRoutes(controller) {
    trace()
    this.router
      .route('/')
      .get(controller.getAll)
      .post(controller.create)
      .delete(controller.deleteAll)
    this.router
      .route('/:id')
      .get(controller.get)
      .put(controller.update)
      .delete(controller.deleteRecord)
  }

  getRouter() {
    trace()
    return this.router
  }
}

export default BaseRouter
