import ProjectController from '../controllers/project.controller.js'
import { trace } from '../util/logger.js'
import BaseRouter from './BaseRouter.js'

const controller = new ProjectController()

class ProjectRouter extends BaseRouter {
  constructor() {
    trace()
    super(controller)

    this.router.route('/bulk').post(controller.bulkCreate)
  }
}

export default ProjectRouter
