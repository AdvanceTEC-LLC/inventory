import { projectController } from '../controllers/index.js'
import { trace } from '../util/logger.js'
import BaseRouter from './classes/BaseRouter.js'

class ProjectRouter extends BaseRouter {
  constructor() {
    trace()
    super(projectController)

    this.router.route('/bulk').post(projectController.bulkCreate)
  }
}

export default ProjectRouter
