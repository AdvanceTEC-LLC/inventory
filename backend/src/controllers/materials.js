import { Router } from 'express'
import { Material, Manufacturer } from '../models/index.js'
import { manufacturerFindOptions } from './manufacturers.js'
import { CustomError } from '../util/errors/CustomError.js'
import { materialsService } from '../services/materialsService.js'
import { sequelize } from '../util/db.js'
import { info } from '../util/logger.js'
const materialsRouter = Router()

export const materialFindOptions = {
  attributes: {
    exclude: ['manufacturerId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerFindOptions,
    },
  ],
}

const materialFinder = async (request, _response, next) => {
  const { id } = request.params
  const material = await Material.findByPk(id, materialFindOptions)

  if (!material) {
    throw new CustomError(
      'NotFoundError',
      `Material with id ${id} not found`,
      404,
    )
  }
  request.material = material
  next()
}

materialsRouter.get('/', async (_request, response) => {
  const material = await Material.findAll(materialFindOptions)

  response.status(200).send(material)
})

materialsRouter.get('/:id', materialFinder, async (request, response) => {
  response.status(200).send(request.material)
})

materialsRouter.post('/', async (request, response, next) => {
  const { manufacturer, name } = request.body

  const transaction = await sequelize.transaction()

  try {
    const material = await materialsService.create(
      { ...request.body, manufacturerId: manufacturer },
      transaction,
    )

    await transaction.commit()

    response.status(201).send(material)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

materialsRouter.post('/bulk', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const material = await materialsService.bulkCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(material)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

materialsRouter.post('/deep', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const material = await materialsService.deepCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(material)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

materialsRouter.delete('/:id', materialFinder, async (request, response) => {
  await request.material.destroy()
  response.status(204).json({ message: 'material entry deleted successfully' })
})

materialsRouter.delete('/', async (request, response) => {
  await Material.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All materials deleted successfully' })
})

export default materialsRouter
