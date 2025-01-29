import { Crate, Shipment, ShipmentCrate } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'

const create = async (shipmentCrate, transaction) => {
  const { crateId, shipmentId } = shipmentCrate

  const crateInDb = await Crate.findByPk(crateId, {
    transaction,
  })

  if (!crateInDb) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found`,
      404,
    )
  }

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

  const shipmentCrateInDb = await ShipmentCrate.create(shipmentCrate, {
    transaction,
  })

  return shipmentCrateInDb
}

export const shipmentCratesService = {
  create,
}
