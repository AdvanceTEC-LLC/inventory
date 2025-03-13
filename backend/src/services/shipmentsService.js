import { Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { projectsService } from './projectsService.js'

const validateTrackingNumber = async (trackingNumber, transaction) => {
  const shipment = await Shipment.findOne({
    where: { trackingNumber },
    transaction,
  })

  if (shipment) {
    throw new CustomError(
      'ValidationError',
      `Shipment with tracking number ${shipment.trackingNumber} already exists.`,
      400,
    )
  }
}

const find = async (shipmentId, transaction) => {
  const shipmentInDb = await Shipment.findByPk(shipmentId, {
    transaction,
  })

  if (!shipmentInDb) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${shipmentId} not found`,
      404,
    )
  }

  return shipmentInDb
}

const create = async (shipment, transaction) => {
  info('ENTERING SHIPMENT CREATE')
  await validateTrackingNumber(shipment.trackingNumber)

  const shipmentInDb = await Shipment.create(shipment, { transaction })

  return shipmentInDb
}

const deepCreate = async (shipment, transaction) => {
  const { trackingNumber, project } = shipment

  const projectInDb = await projectsService.findOrCreate(project, transaction)

  const shipmentInDb = await create(
    {
      trackingNumber,
      projectId: projectInDb.id,
    },
    transaction,
  )

  return shipmentInDb
}

export const shipmentsService = {
  find,
  create,
  deepCreate,
}
