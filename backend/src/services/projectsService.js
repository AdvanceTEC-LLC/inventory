import { Project } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'

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

export const projectsService = {
  create,
  findOrCreate,
}
