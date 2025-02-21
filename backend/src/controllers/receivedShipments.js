import { Router } from 'express'
import { ReceivedShipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { sequelize } from '../util/db.js'
import { receivedShipmentsService } from '../services/receivedShipmentsService.js'
const receivedShipmentsRouter = Router()

export const receivedShipmentFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const receivedShipmentFinder = async (request, _response, next) => {
  const { id } = request.params
  const receivedShipment = await ReceivedShipment.findByPk(
    id,
    receivedShipmentFindOptions,
  )

  if (!receivedShipment) {
    throw new CustomError(
      'NotFoundError',
      `Received shipment with id ${id} not found`,
      404,
    )
  }
  request.receivedShipment = receivedShipment
  next()
}

receivedShipmentsRouter.get('/', async (_request, response) => {
  const receivedShipment = await ReceivedShipment.findAll(
    receivedShipmentFindOptions,
  )

  response.status(200).send(receivedShipment)
})

receivedShipmentsRouter.get(
  '/:id',
  receivedShipmentFinder,
  async (request, response) => {
    response.status(200).send(request.receivedShipment)
  },
)

receivedShipmentsRouter.post('/', async (request, response) => {
  const transaction = await sequelize.transaction()

  try {
    const receivedShipment = await receivedShipmentsService.create(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(receivedShipment)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

receivedShipmentsRouter.post('/deep/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const receivedShipment = await receivedShipmentsService.deepCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(receivedShipment)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

receivedShipmentsRouter.delete(
  '/:id',
  receivedShipmentFinder,
  async (request, response) => {
    await request.receivedShipment.destroy()
    response
      .status(204)
      .json({ message: 'Received shipment entry deleted successfully' })
  },
)

receivedShipmentsRouter.delete('/', async (request, response) => {
  await ReceivedShipment.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All received shipments deleted successfully' })
})

export default receivedShipmentsRouter
