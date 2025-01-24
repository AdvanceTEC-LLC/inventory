import { Router } from 'express'
import { Project } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
const projectsRouter = Router()

export const projectFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const projectFinder = async (request, _response, next) => {
  const { id } = request.params
  const project = await Project.findByPk(id, projectFindOptions)

  if (!project) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${id} not found`,
      404,
    )
  }
  request.project = project
  next()
}

projectsRouter.get('/', async (_request, response) => {
  const project = await Project.findAll(projectFindOptions)

  response.status(200).send(project)
})

projectsRouter.get('/:id', projectFinder, async (request, response) => {
  response.status(200).send(request.project)
})

projectsRouter.post('/', async (request, response) => {
  const { number, name, active } = request.body

  const project = await Project.create({
    number,
    name,
    active,
  })

  response.status(201).send(project)
})

projectsRouter.delete('/:id', projectFinder, async (request, response) => {
  await request.project.destroy()
  response.status(204).json({ message: 'project entry deleted successfully' })
})

projectsRouter.delete('/', async (request, response) => {
  await Project.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All projects deleted successfully' })
})

export default projectsRouter
