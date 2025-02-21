import { Router } from 'express'
import { SentShipment, Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
const sentShipmentsRouter = Router()

export const sentShipmentFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const sentShipmentFinder = async (request, _response, next) => {
  const { id } = request.params
  const sentShipment = await SentShipment.findByPk(id, sentShipmentFindOptions)

  if (!sentShipment) {
    throw new CustomError(
      'NotFoundError',
      `Sent shipment with id ${id} not found`,
      404,
    )
  }
  request.sentShipment = sentShipment
  next()
}

sentShipmentsRouter.get('/', async (_request, response) => {
  const sentShipment = await SentShipment.findAll(sentShipmentFindOptions)

  response.status(200).send(sentShipment)
})

sentShipmentsRouter.get(
  '/:id',
  sentShipmentFinder,
  async (request, response) => {
    response.status(200).send(request.sentShipment)
  },
)

sentShipmentsRouter.post('/', async (request, response) => {
  const { shipmentId, sendDate, delivered } = request.body

  const shipmentInDb = await Shipment.findByPk(shipmentId)

  if (!shipmentInDb) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${shipmentId} not found`,
      404,
    )
  }

  const parsedSendDate = new Date(sendDate)

  if (sendDate !== null && isNaN(parsedSendDate.getTime())) {
    throw new CustomError('ValidationError', 'Send date is invalid.', 400)
  }

  const sentShipment = await SentShipment.create({
    shipmentId,
    sendDate: parsedSendDate,
    delivered,
  })

  response.status(201).send(sentShipment)
})

sentShipmentsRouter.delete(
  '/:id',
  sentShipmentFinder,
  async (request, response) => {
    await request.sentShipment.destroy()
    response
      .status(204)
      .json({ message: 'Sent shipment entry deleted successfully' })
  },
)

sentShipmentsRouter.delete('/', async (request, response) => {
  await SentShipment.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All sent shipments deleted successfully' })
})

export default sentShipmentsRouter
