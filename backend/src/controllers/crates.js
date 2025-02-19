import { Router } from 'express'
import {
  Crate,
  ShelfLocation,
  Project,
  Stock,
  WarehouseLocation,
  StagingArea,
} from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { shelfLocationFindOptions } from './shelfLocations.js'
import { stockFindOptions } from './stock.js'
import { CustomError } from '../util/errors/CustomError.js'
import { warehouseLocationFindOptions } from './warehouseLocations.js'
import { sequelize } from '../util/db.js'
import { cratesService } from '../services/cratesService.js'
import { info } from '../util/logger.js'
import { stagingAreaFindOptions } from './stagingAreas.js'
const cratesRouter = Router()

export const crateFindOptions = {
  attributes: {
    exclude: [
      'warehouseLocationId',
      'shelfLocationId',
      'stagingAreaId',
      'projectId',
      'vendorId',
      'createdAt',
      'updatedAt',
    ],
  },
  include: [
    {
      model: WarehouseLocation,
      as: 'warehouseLocation',
      ...warehouseLocationFindOptions,
    },
    {
      model: ShelfLocation,
      as: 'shelfLocation',
      ...shelfLocationFindOptions,
    },
    {
      model: StagingArea,
      as: 'stagingArea',
      ...stagingAreaFindOptions,
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
  const {
    number,
    warehouseLocationId,
    shelfLocationId,
    stagingAreaId,
    projectId,
    opened,
  } = request.body

  const warehouseLocationExists =
    await WarehouseLocation.findByPk(warehouseLocationId)

  if (!warehouseLocationExists) {
    throw new CustomError(
      'NotFoundError',
      `Warehouse location with id ${warehouseLocationId} not found`,
      404,
    )
  }

  const shelfLocationExists = await shelfLocation.findByPk(shelfLocationId)

  if (!shelfLocationExists) {
    throw new CustomError(
      'NotFoundError',
      `Shelf location with id ${shelfLocationId} not found`,
      404,
    )
  }

  const stagingAreaExists = await StagingArea.findByPk(stagingAreaId)

  if (!stagingAreaExists) {
    throw new CustomError(
      'NotFoundError',
      `Staging area with id ${stagingAreaId} not found`,
      404,
    )
  }

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
  }

  const crate = await Crate.create({
    number,
    warehouseLocationId,
    shelfLocationId,
    stagingAreaId,
    projectId,
    opened,
  })

  response.status(201).send(crate)
})

cratesRouter.post('/deep/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const crate = await cratesService.deepCreate(request.body, transaction)

    await transaction.commit()

    response.status(201).send(crate)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

cratesRouter.put('/bulk/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const crate = await cratesService.bulkUpdate(request.body, transaction)

    await transaction.commit()

    response.status(201).send(crate)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

cratesRouter.delete('/:id/', crateFinder, async (request, response) => {
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
