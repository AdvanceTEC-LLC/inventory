import { UniqueConstraintError } from 'sequelize'
import { Project } from '../models/index.js'
import MissingRequiredError from '../util/errors/MissingRequiredError.js'
import NotFoundError from '../util/errors/NotFoundError.js'
import { info } from '../util/logger.js'

const validateName = async (name) => {
  info('ENTERING PROJECT VALIDATE NAME')
  if (name === undefined || name === null) {
    throw new MissingRequiredError('Project', 'name', 'is required')
  } else if (typeof name !== 'string')
    throw new MissingRequiredError('Project', 'name', 'must be a string')
  else if (name.trim().length === 0) {
    throw new MissingRequiredError('Project', 'name', 'must not be empty')
  }
}
const validateNumber = async (number) => {
  info('ENTERING PROJECT VALIDATE NUMBER')
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

const find = async (projectId, transaction) => {
  info('ENTERING PROJECT FIND')

  const projectInDb = await Project.findByPk(projectId, {
    transaction,
  })

  if (!projectInDb) {
    throw new NotFoundError('Project', projectId)
  }

  return projectInDb
}

const create = async (project, transaction) => {
  info('ENTERING PROJECT CREATE')
  await validateNumber(project.number)
  await validateName(project.name)

  const projectInDb = await Project.create(project, { transaction })

  return projectInDb
}

const findOrCreate = async (project, transaction) => {
  info('ENTERING PROJECT FIND OR CREATE')

  let projectInDb = await Project.findOne({
    where: { number: project.number },
    transaction,
  })

  if (!projectInDb) {
    projectInDb = await Project.create(project, { transaction })
  }

  return projectInDb
}

const bulkCreate = async (projects, transaction) => {
  info('ENTERING PROJECT BULK CREATE')

  const projectsInDb = await Project.bulkCreate(projects, {
    transaction,
  })

  return projectsInDb
}

const update = async (projectId, data, transaction) => {
  info('ENTERING PROJECT UPDATE')
  const { number, name } = data

  await validateNumber(number)
  await validateName(name)

  const project = await find(projectId, transaction)

  await project.update(data, { transaction })
  return project
}

export const projectsService = {
  find,
  create,
  findOrCreate,
  bulkCreate,
  update,
}
