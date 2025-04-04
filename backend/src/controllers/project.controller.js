import BaseController from './classes/BaseController.js'
import { projectService } from '../services/index.js'
import bulkCreate from './functions/bulkCreate.js'
import { trace } from '../util/logger.js'

class ProjectController extends BaseController {
  constructor() {
    trace()
    super(projectService)

    this.bulkCreate = bulkCreate(projectService)
  }
}

export default ProjectController
