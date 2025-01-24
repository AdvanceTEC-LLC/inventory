import { Router } from 'express'
import { Manufacturer, ReceivedShipment, Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
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
  const { shipmentId, receivedDate, manufacturerId } = request.body

  const shipmentInDb = await Shipment.findByPk(shipmentId)

  if (!shipmentInDb) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${shipmentId} not found`,
      404,
    )
  }

  const parsedReceivedDate = new Date(receivedDate)

  if (receivedDate !== null && isNaN(parsedReceivedDate.getTime())) {
    throw new CustomError('ValidationError', 'Received date is invalid.', 400)
  }

  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId)

  if (manufacturerId && !manufacturerInDb) {
    throw new CustomError(
      'NotFoundError',
      `manufacturer with id ${manufacturerId} not found`,
      404,
    )
  }

  const receivedShipment = await ReceivedShipment.create({
    shipmentId,
    receivedDate: parsedReceivedDate,
    manufacturerId,
  })

  response.status(201).send(receivedShipment)
})

receivedShipmentsRouter.delete(
  '/:id',
  receivedShipmentFinder,
  async (request, response) => {
    await request.ReceivedShipment.destroy()
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
