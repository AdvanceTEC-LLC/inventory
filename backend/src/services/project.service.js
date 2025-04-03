import BaseService from './classes/BaseService.js'
import { Project } from '../models/index.js'
import projectSchema from './validation/project.validation.js'
import { trace } from '../util/logger.js'

class ProjectService extends BaseService {
  constructor() {
    trace()
    super(Project)
  }

  get findOptions() {
    return {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    }
  }

  async validate(project) {
    trace()
    await super.validate(projectSchema, project)
  }

  async bulkCreate(projects, transaction) {
    trace()

    await super.validateArray(projects)

    const projectsInDb = await Project.bulkCreate(projects, {
      transaction,
    })

    return projectsInDb
  }
}

export default ProjectService
