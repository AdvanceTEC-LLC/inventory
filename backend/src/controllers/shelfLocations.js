import { Router } from 'express'
import { ShelfLocation } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { sequelize } from '../util/db.js'
import { shelfLocationsService } from '../services/shelfLocationsService.js'
const shelfLocationsRouter = Router()

export const shelfLocationFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const shelfLocationFinder = async (request, _response, next) => {
  const { id } = request.params
  const shelfLocation = await ShelfLocation.findByPk(
    id,
    shelfLocationFindOptions,
  )

  if (!shelfLocation) {
    throw new CustomError(
      'NotFoundError',
      `Shelf location with id ${id} not found`,
      404,
    )
  }
  request.shelfLocation = shelfLocation
  next()
}

shelfLocationsRouter.get('/', async (_request, response) => {
  const shelfLocation = await ShelfLocation.findAll(shelfLocationFindOptions)

  response.status(200).send(shelfLocation)
})

shelfLocationsRouter.get(
  '/:id',
  shelfLocationFinder,
  async (request, response) => {
    response.status(200).send(request.shelfLocation)
  },
)

shelfLocationsRouter.post('/', async (request, response) => {
  const { side, aisle, col, shelf } = request.body

  const shelfLocation = await ShelfLocation.create({
    side,
    aisle,
    col,
    shelf,
  })

  response.status(201).send(shelfLocation)
})

shelfLocationsRouter.post('/bulk/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const shelfLocations = await shelfLocationsService.bulkCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(shelfLocations)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

shelfLocationsRouter.delete(
  '/:id',
  shelfLocationFinder,
  async (request, response) => {
    await request.shelfLocation.destroy()
    response
      .status(204)
      .json({ message: 'Shelf location entry deleted successfully' })
  },
)

shelfLocationsRouter.delete('/', async (request, response) => {
  await ShelfLocation.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All shelf locations deleted successfully' })
})

export default shelfLocationsRouter
