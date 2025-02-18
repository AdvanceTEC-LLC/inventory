import { Router } from 'express'
import { WarehouseLocation } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { warehouseLocationsService } from '../services/warehouseLocationsService.js'
import { sequelize } from '../util/db.js'
const warehouseLocationsRouter = Router()

export const warehouseLocationFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const warehouseLocationFinder = async (request, _response, next) => {
  const { id } = request.params
  const warehouseLocation = await WarehouseLocation.findByPk(
    id,
    warehouseLocationFindOptions,
  )

  if (!warehouseLocation) {
    throw new CustomError(
      'NotFoundError',
      `Warehouse location with id ${id} not found`,
      404,
    )
  }
  request.warehouseLocation = warehouseLocation
  next()
}

warehouseLocationsRouter.get('/', async (_request, response) => {
  const warehouseLocation = await WarehouseLocation.findAll(
    warehouseLocationFindOptions,
  )

  response.status(200).send(warehouseLocation)
})

warehouseLocationsRouter.get(
  '/:id',
  warehouseLocationFinder,
  async (request, response) => {
    response.status(200).send(request.warehouseLocation)
  },
)

warehouseLocationsRouter.post('/', async (request, response) => {
  const { name, isDefault } = request.body

  const warehouseLocation = await WarehouseLocation.create({
    name,
    isDefault,
  })

  response.status(201).send(warehouseLocation)
})

warehouseLocationsRouter.post('/bulk/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const warehouseLocations = await warehouseLocationsService.bulkCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(warehouseLocations)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

warehouseLocationsRouter.delete(
  '/:id',
  warehouseLocationFinder,
  async (request, response) => {
    await request.warehouseLocation.destroy()
    response
      .status(204)
      .json({ message: 'Warehouse location entry deleted successfully' })
  },
)

warehouseLocationsRouter.delete('/', async (request, response) => {
  await WarehouseLocation.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All warehouseLocations deleted successfully' })
})

export default warehouseLocationsRouter
