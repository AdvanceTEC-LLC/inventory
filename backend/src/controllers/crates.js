import { Router } from 'express'
import { Crate, Location, Project, Stock } from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { locationFindOptions } from './locations.js'
import { stockFindOptions } from './stock.js'
import { CustomError } from '../util/errors/CustomError.js'
const cratesRouter = Router()

export const crateFindOptions = {
  attributes: {
    exclude: ['locationId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Location,
      as: 'location',
      ...locationFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      through: { attributes: [] },
      ...stockFindOptions,
    },
  ],
}

const crateFinder = async (request, _response, next) => {
  const { id } = request.params
  const crate = await Crate.findByPk(id, crateFindOptions)

  if (!crate) {
    throw new CustomError('NotFoundError', `Crate with id ${id} not found`, 404)
  }
  request.crate = crate
  next()
}

cratesRouter.get('/', async (_request, response) => {
  const crate = await Crate.findAll(crateFindOptions)

  response.status(200).send(crate)
})

cratesRouter.get('/:id', crateFinder, async (request, response) => {
  response.status(200).send(request.crate)
})

cratesRouter.post('/', async (request, response) => {
  const { number, locationId, projectId } = request.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
  }

  const locationExists = await Location.findByPk(locationId)

  if (!locationExists) {
    throw new CustomError(
      'NotFoundError',
      `Location with id ${locationId} not found`,
      404,
    )
  }

  const crate = await Crate.create({
    number,
    locationId,
    projectId,
  })

  response.status(201).send(crate)
})

cratesRouter.delete('/:id', crateFinder, async (request, response) => {
  await request.crate.destroy()
  response.status(204).json({ message: 'Crate entry deleted successfully' })
})

cratesRouter.delete('/', async (request, response) => {
  await Crate.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All crates deleted successfully' })
})

export default cratesRouter
