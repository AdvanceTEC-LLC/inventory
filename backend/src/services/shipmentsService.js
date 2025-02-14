import { Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { cratesService } from './cratesService.js'
import { projectsService } from './projectsService.js'
import { shipmentCratesService } from './shipmentCratesService.js'

const create = async (shipment, transaction) => {
  let shipmentInDb = await Shipment.findOne({
    where: { trackingNumber: shipment.trackingNumber },
    transaction,
  })

  if (shipmentInDb) {
    throw new CustomError(
      'ValidationError',
      `Shipment with tracking number ${shipment.trackingNumber} already exists.`,
      400,
    )
  }

  shipmentInDb = await Shipment.create(shipment, { transaction })

  return shipmentInDb
}

const deepCreate = async (shipment, transaction) => {
  const { trackingNumber, project, crates } = shipment

  const projectInDb = await projectsService.findOrCreate(project, transaction)

  const shipmentInDb = await create(
    {
      trackingNumber,
      projectId: projectInDb.id,
    },
    transaction,
  )

  await Promise.all(
    crates.map(async (crate) => {
      const crateInDb = await cratesService.deepCreate(
        {
          ...crate,
          projectId: projectInDb.id,
        },
        transaction,
      )

      await shipmentCratesService.create(
        {
          crateId: crateInDb.id,
          shipmentId: shipmentInDb.id,
        },
        transaction,
      )
    }),
  )

  return shipmentInDb
}

export const shipmentsService = {
  deepCreate,
}
