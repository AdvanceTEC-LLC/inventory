import { Router } from 'express'
import { Shipment, Project, Crate } from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { crateFindOptions } from './crates.js'
import { CustomError } from '../util/errors/CustomError.js'
import { sequelize } from '../util/db.js'
import { shipmentsService } from '../services/shipmentsService.js'
const shipmentsRouter = Router()

export const shipmentFindOptions = {
  attributes: {
    exclude: ['projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const shipmentFinder = async (request, _response, next) => {
  const { id } = request.params
  const shipment = await Shipment.findByPk(id, shipmentFindOptions)

  if (!shipment) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${id} not found`,
      404,
    )
  }

  const shipmentCrates = await ShipmentCrate.findAll({
    attributes: { where: { shipmentId: request.shipment.id } },
  })

  const findCrate = async (crateId) => {
    return await Crate.findByPk(crateId, crateFindOptions)
  }

  const crates = shipmentCrates.map((shipmentCrate) =>
    findCrate(shipmentCrate.crateId),
  )

  request.shipment = { ...request.shipment, crates }

  next()
}

shipmentsRouter.get('/', async (_request, response) => {
  const shipments = await Shipment.findAll(shipmentFindOptions)
  response.status(200).send(shipments)
})

shipmentsRouter.get('/:id', shipmentFinder, async (request, response) => {
  response.status(200).send(request.shipment)
})

shipmentsRouter.post('/', async (request, response, next) => {
  const { trackingNumber, projectId } = request.body

  const projectInDb = await Project.findByPk(projectId)

  if (!projectInDb) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
  }

  const shipment = await Shipment.create({
    trackingNumber,
    projectId,
  })

  response.status(201).send(shipment)
})

shipmentsRouter.post('/deep', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const shipment = await shipmentsService.deepCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(shipment)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

shipmentsRouter.delete('/:id', shipmentFinder, async (request, response) => {
  await request.shipment.destroy()
  response.status(204).json({ message: 'Shipment entry deleted successfully' })
})

shipmentsRouter.delete('/', async (request, response) => {
  await Shipment.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All shipments deleted successfully' })
})

export default shipmentsRouter
