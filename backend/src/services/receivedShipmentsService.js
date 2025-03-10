import { ReceivedShipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { manufacturersService } from './manufacturersService.js'
import { materialCratesService } from './materialCratesService.js'
import { shipmentCratesService } from './shipmentCratesService.js'
import { shipmentsService } from './shipmentsService.js'

const parseReceivedDate = (receivedDate) => {
  const parsedReceivedDate = new Date(receivedDate)

  if (receivedDate !== null && isNaN(parsedReceivedDate.getTime())) {
    throw new CustomError('ValidationError', 'Received date is invalid.', 400)
  }

  return parsedReceivedDate
}

const create = async (receivedShipment, transaction) => {
  info('ENTERING RCEIVED SHIPMENT CREATE')

  const { shipmentId, receivedDate, manufacturerId } = receivedShipment

  const parsedReceivedDate = parseReceivedDate(receivedDate)

  await shipmentsService.find(shipmentId, transaction)

  await manufacturersService.find(manufacturerId, transaction)

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
  info('ENTERING RECEIVED SHIPMENT DEEP CREATE')
  const { shipment, materialCrates } = receivedShipment

  const shipmentInDb = await shipmentsService.create(shipment, transaction)

  const receivedShipmentInDb = await create(
    { ...receivedShipment, shipmentId: shipmentInDb.id },
    transaction,
  )

  await Promise.all(
    materialCrates.map(async (materialCrate) => {
      const materialCrateInDb = await materialCratesService.deepCreate(
        materialCrate,
        transaction,
      )

      await shipmentCratesService.create(
        {
          crateId: materialCrateInDb.crateId,
          shipmentId: shipmentInDb.id,
        },
        transaction,
      )
    }),
  )

  return receivedShipmentInDb
}

export const receivedShipmentsService = {
  create,
  deepCreate,
}
