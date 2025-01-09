import { Router } from 'express'
import { Crate, Storage, Project, Stock, Vendor } from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { storageFindOptions } from './storages.js'
import { stockFindOptions } from './stock.js'
import { CustomError } from '../util/errors/CustomError.js'
import { vendorFindOptions } from './vendors.js'
const cratesRouter = Router()

export const crateFindOptions = {
  attributes: {
    exclude: ['storageId', 'projectId', 'vendorId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Storage,
      as: 'storage',
      ...storageFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: Vendor,
      as: 'vendor',
      ...vendorFindOptions,
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
  const { number, storageId, projectId } = request.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
  }

  const storageExists = await storage.findByPk(storageId)

  if (!storageExists) {
    throw new CustomError(
      'NotFoundError',
      `storage with id ${storageId} not found`,
      404,
    )
  }

  const crate = await Crate.create({
    number,
    storageId,
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
