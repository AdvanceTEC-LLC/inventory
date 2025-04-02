import { Project } from '../models/index.js'
import BaseService from './BaseService.js'
import {
  MissingRequiredError,
  UniqueConstraintError,
} from '../util/errors/index.js'
import { trace } from '../util/logger.js'

export const projectFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const validateName = async (name) => {
  trace()

  if (name === undefined || name === null) {
    throw new MissingRequiredError('Project', 'name', 'is required')
  } else if (typeof name !== 'string')
    throw new MissingRequiredError('Project', 'name', 'must be a string')
  else if (name.trim().length === 0) {
    throw new MissingRequiredError('Project', 'name', 'must not be empty')
  }
}

const validateNumber = async (number) => {
  trace()

  if (number === undefined || number === null) {
    throw new MissingRequiredError('Project', 'number', 'is required')
  } else if (typeof number !== 'number')
    throw new MissingRequiredError('Project', 'number', 'must be a number')
  else if (number <= 0)
    throw new MissingRequiredError(
      'Project',
      'number',
      'must be a positive number',
    )
  else if (number % 1 !== 0)
    throw new MissingRequiredError('Project', 'number', 'must be an integer')
  else if (number > Number.MAX_SAFE_INTEGER)
    throw new MissingRequiredError(
      'Project',
      'number',
      'must be a safe integer',
    )
  // Check if the project number already exists in the database
  const projectInDb = await Project.findOne({ where: { number: number } })
  if (projectInDb) {
    throw new UniqueConstraintError('Project', 'number', number)
  }
}

class ProjectService extends BaseService {
  constructor() {
    trace()
    super(Project)
  }

  async validate(project) {
    trace()
    await super.validate(project)

    await validateNumber(project.number)
    await validateName(project.name)
  }

  async createBulk(projects, transaction) {
    trace()

    await super.validateArray(projects)

    const projectsInDb = await Project.bulkCreate(projects, {
      transaction,
    })

    return projectsInDb
  }
}

export default ProjectService
