import { Router } from 'express'
import {
  Crate,
  ShelfLocation,
  Project,
  CrateLocation,
} from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { shelfLocationFindOptions } from './shelfLocations.js'
import { CustomError } from '../util/errors/CustomError.js'
import { crateLocationFindOptions } from './crateLocations.js'
import { sequelize } from '../util/db.js'
import { cratesService } from '../services/cratesService.js'
const cratesRouter = Router()

export const crateFindOptions = {
  attributes: {
    exclude: [
      'crateLocationId',
      'shelfLocationId',
      'projectId',
      'vendorId',
      'createdAt',
      'updatedAt',
    ],
  },
  include: [
    {
      model: CrateLocation,
      as: 'crateLocation',
      ...crateLocationFindOptions,
    },
    {
      model: ShelfLocation,
      as: 'shelfLocation',
      ...shelfLocationFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
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

cratesRouter.post('/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const crate = await cratesService.create(request.body, transaction)

    await transaction.commit()

    response.status(201).send(crate)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
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
