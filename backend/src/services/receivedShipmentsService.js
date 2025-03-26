import { ReceivedShipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { error, info } from '../util/logger.js'
import { manufacturersService } from './manufacturersService.js'
import { materialCratesService } from './materialCratesService.js'
import { projectsService } from './projectsService.js'
import { receivedShipmentMaterialCratesService } from './receivedShipmentMaterialCratesService.js'

const parseReceivedDate = (receivedDate) => {
  if (!receivedDate) {
    throw new CustomError('ValidationError', 'Received date is required.', 400)
  }

  const parsedReceivedDate = new Date(receivedDate)

  if (isNaN(parsedReceivedDate.getTime())) {
    throw new CustomError('ValidationError', 'Received date is invalid.', 400)
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
    throw new CustomError(
      'NotFoundError',
      `Received shipment with id ${receivedShipmentId} not found.`,
      404,
    )
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

  await manufacturersService.find(manufacturerId, transaction)
  await projectsService.find(projectId, transaction)

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
