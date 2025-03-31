import { ReceivedShipment } from '../models/index.js'
import { info } from '../util/logger.js'
import { manufacturersService } from './manufacturersService.js'
import { materialCratesService } from './materialCratesService.js'
import { receivedShipmentMaterialCratesService } from './receivedShipmentMaterialCratesService.js'
import { shipmentsService } from './shipmentsService.js'

const parseReceivedDate = (receivedDate) => {
  const parsedReceivedDate = new Date(receivedDate)

  if (receivedDate !== null && isNaN(parsedReceivedDate.getTime())) {
    throw new ValidationError('Received date is invalid')
  }

  return parsedReceivedDate
}

const find = async (receivedShipmentId, transaction) => {
  info('ENTERING RECEIVED SHIPMENT FIND')

  const receivedShipmentInDb = await ReceivedShipment.findByPk(
    receivedShipmentId,
    {
      transaction,
    },
  )

  if (!receivedShipmentInDb) {
    throw new NotFoundError('Received shipment', receivedShipmentId)
  }

  return receivedShipmentInDb
}

const create = async (receivedShipment, transaction) => {
  info('ENTERING RECEIVED SHIPMENT CREATE')

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

      await receivedShipmentMaterialCratesService.create(
        {
          receivedShipmentId: receivedShipmentInDb.id,
          materialCrateId: materialCrateInDb.id,
        },
        transaction,
      )
    }),
  )

  return receivedShipmentInDb
}

export const receivedShipmentsService = {
  find,
  create,
  deepCreate,
}
