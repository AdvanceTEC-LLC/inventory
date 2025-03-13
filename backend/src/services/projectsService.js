import { Project } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'

const find = async (projectId, transaction) => {
  info('ENTERING PROJECT FIND')

  const projectInDb = await Project.findByPk(projectId, {
    transaction,
  })

  if (!projectInDb) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found.`,
      404,
    )
  }

  return projectInDb
}

const create = async (project, transaction) => {
  let projectInDb = await Project.findOne({
    where: { number: project.number },
    transaction,
  })

  if (projectInDb) {
    throw new CustomError(
      'ValidationError',
      `Project with number ${project.number} already exists.`,
      400,
    )
  }

  projectInDb = await Project.create(project, { transaction })

  return projectInDb
}

const findOrCreate = async (project, transaction) => {
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
  const projectsInDb = await Project.bulkCreate(projects, {
    transaction,
  })

  return projectsInDb
}

export const projectsService = {
  find,
  create,
  findOrCreate,
  bulkCreate,
}
