import { Router } from 'express'
import { Manufacturer } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { manufacturersService } from '../services/manufacturersService.js'
import { sequelize } from '../util/db.js'
const manufacturersRouter = Router()

export const manufacturerFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const manufacturerFinder = async (request, _response, next) => {
  const { id } = request.params
  const manufacturer = await Manufacturer.findByPk(id, manufacturerFindOptions)

  if (!manufacturer) {
    throw new CustomError(
      'NotFoundError',
      `Manufacturer with id ${id} not found`,
      404,
    )
  }

  request.manufacturer = manufacturer
  next()
}

manufacturersRouter.get('/', async (_request, response) => {
  const manufacturer = await Manufacturer.findAll(manufacturerFindOptions)

  response.status(200).send(manufacturer)
})

manufacturersRouter.get(
  '/:id',
  manufacturerFinder,
  async (request, response) => {
    response.status(200).send(request.manufacturer)
  },
)

manufacturersRouter.post('/', async (request, response) => {
  const { name } = request.body

  const manufacturer = await Manufacturer.create({
    name,
  })

  response.status(201).send(manufacturer)
})

manufacturersRouter.post('/bulk/', async (request, response) => {
  const transaction = await sequelize.transaction()

  try {
    const manufacturers = await manufacturersService.bulkCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(manufacturers)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

manufacturersRouter.delete(
  '/:id',
  manufacturerFinder,
  async (request, response) => {
    await request.manufacturer.destroy()
    response
      .status(204)
      .json({ message: 'Manufacturer entry deleted successfully' })
  },
)

manufacturersRouter.delete('/', async (request, response) => {
  await Manufacturer.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All manufacturers deleted successfully' })
})

export default manufacturersRouter
