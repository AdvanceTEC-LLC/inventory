import { Router } from 'express'
import { Storage } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
const storagesRouter = Router()

export const storageFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const storageFinder = async (request, _response, next) => {
  const { id } = request.params
  const storage = await Storage.findByPk(id, storageFindOptions)

  if (!storage) {
    throw new CustomError(
      'NotFoundError',
      `Storage with id ${id} not found`,
      404,
    )
  }
  request.storage = storage
  next()
}

storagesRouter.get('/', async (_request, response) => {
  const storage = await Storage.findAll(storageFindOptions)

  response.status(200).send(storage)
})

storagesRouter.get('/:id', storageFinder, async (request, response) => {
  response.status(200).send(request.storage)
})

storagesRouter.post('/', async (request, response) => {
  const { aisle, col, shelf } = request.body

  const storage = await Storage.create({
    aisle,
    col,
    shelf,
  })

  response.status(201).send(storage)
})

storagesRouter.delete('/:id', storageFinder, async (request, response) => {
  await request.storage.destroy()
  response.status(204).json({ message: 'Storage entry deleted successfully' })
})

storagesRouter.delete('/', async (request, response) => {
  await Storage.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All storages deleted successfully' })
})

export default storagesRouter
