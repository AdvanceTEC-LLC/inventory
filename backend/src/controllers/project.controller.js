import ProjectService from '../services/project.service.js'
import { trace } from '../util/logger.js'
import BaseController from './BaseController.js'
import bulkCreate from './functions/bulkCreate.js'

const service = new ProjectService()

class ProjectController extends BaseController {
  constructor() {
    trace()
    super(service)

    this.bulkCreate = bulkCreate(service)
  }
}

export default ProjectController
