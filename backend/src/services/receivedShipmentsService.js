import { ReceivedShipment } from '../models/index.js'
import { info } from '../util/logger.js'
import { manufacturerService } from './index.js'
import { materialCratesService } from './materialCratesService.js'
import { receivedShipmentMaterialCratesService } from './receivedShipmentMaterialCratesService.js'
import { NotFoundError, ValidationError } from '../util/errors/index.js'

const parseReceivedDate = (receivedDate) => {
  if (!receivedDate) {
    throw new ValidationError('Received date is required.')
  }

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

  const {
    trackingNumber,
    purchaseOrder,
    salesOrder,
    orderAcknowledgement,
    receivedDate,
    manufacturerId,
    projectId,
  } = receivedShipment

  const parsedReceivedDate = parseReceivedDate(receivedDate)

  await manufacturerService.get(manufacturerId)

  const receivedShipmentInDb = await ReceivedShipment.create(
    {
      trackingNumber,
      purchaseOrder,
      salesOrder,
      orderAcknowledgement,
      receivedDate: parsedReceivedDate,
      manufacturerId,
      projectId,
    },
    { transaction },
  )

  return receivedShipmentInDb
}

const deepCreate = async (receivedShipment, transaction) => {
  info('ENTERING RECEIVED SHIPMENT DEEP CREATE')
  const { materialCrates } = receivedShipment

  const receivedShipmentInDb = await create(receivedShipment, transaction)

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
