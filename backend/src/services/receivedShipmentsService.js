import { Manufacturer, ReceivedShipment, Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { manufacturersService } from './manufacturersService.js'
import { shipmentsService } from './shipmentsService.js'

const parseReceivedDate = (receivedDate) => {
  const parsedReceivedDate = new Date(receivedDate)

  if (receivedDate !== null && isNaN(parsedReceivedDate.getTime())) {
    throw new CustomError('ValidationError', 'Received date is invalid.', 400)
  }

  return parsedReceivedDate
}

const create = async (receivedShipment, transaction) => {
  const { shipmentId, receivedDate, manufacturerId } = receivedShipment

  const parsedReceivedDate = parseReceivedDate(receivedDate)

  const shipmentInDb = await Shipment.findByPk(shipmentId, { transaction })

  if (!shipmentInDb) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${shipmentId} not found`,
      404,
    )
  }

  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId, {
    transaction,
  })

  if (manufacturerId && !manufacturerInDb) {
    throw new CustomError(
      'NotFoundError',
      `manufacturer with id ${manufacturerId} not found`,
      404,
    )
  }

  const receivedShipmentInDb = await ReceivedShipment.create(
    {
      shipmentId,
      receivedDate: parsedReceivedDate,
      manufacturerId,
    },
    { transaction },
  )

  return receivedShipmentInDb
}

const deepCreate = async (receivedShipment, transaction) => {
  const { shipment, receivedDate, manufacturer } = receivedShipment

  const manufacturerInDb = await manufacturersService.findOrCreate(
    manufacturer,
    transaction,
  )

  const shipmentInDb = await shipmentsService.deepCreate(shipment, transaction)

  const parsedReceivedDate = parseReceivedDate(receivedDate)

  const receivedShipmentInDb = await receivedShipmentsService.create(
    {
      receivedDate: parsedReceivedDate,
      manufacturerId: manufacturerInDb.id,
      shipmentId: shipmentInDb.id,
    },
    transaction,
  )

  return receivedShipmentInDb
}

export const receivedShipmentsService = {
  create,
  deepCreate,
}
