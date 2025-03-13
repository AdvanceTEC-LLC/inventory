import { Router } from 'express'
import { CrateLocation } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { crateLocationsService } from '../services/crateLocationsService.js'
import { sequelize } from '../util/db.js'
const crateLocationsRouter = Router()

export const crateLocationFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const crateLocationFinder = async (request, _response, next) => {
  const { id } = request.params
  const crateLocation = await CrateLocation.findByPk(
    id,
    crateLocationFindOptions,
  )

  if (!crateLocation) {
    throw new CustomError(
      'NotFoundError',
      `crate location with id ${id} not found`,
      404,
    )
  }
  request.crateLocation = crateLocation
  next()
}

crateLocationsRouter.get('/', async (_request, response) => {
  const crateLocation = await CrateLocation.findAll(crateLocationFindOptions)

  response.status(200).send(crateLocation)
})

crateLocationsRouter.get(
  '/:id',
  crateLocationFinder,
  async (request, response) => {
    response.status(200).send(request.crateLocation)
  },
)

crateLocationsRouter.post('/', async (request, response) => {
  const { name, isDefault } = request.body

  const crateLocation = await CrateLocation.create({
    name,
    isDefault,
  })

  response.status(201).send(crateLocation)
})

crateLocationsRouter.post('/bulk/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const crateLocations = await crateLocationsService.bulkCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(crateLocations)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

crateLocationsRouter.delete(
  '/:id',
  crateLocationFinder,
  async (request, response) => {
    await request.crateLocation.destroy()
    response
      .status(204)
      .json({ message: 'crate location entry deleted successfully' })
  },
)

crateLocationsRouter.delete('/', async (request, response) => {
  await CrateLocation.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All crateLocations deleted successfully' })
})

export default crateLocationsRouter
