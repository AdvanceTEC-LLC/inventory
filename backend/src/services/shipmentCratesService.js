import { ShipmentCrate } from '../models/index.js'
import { cratesService } from './cratesService.js'
import { shipmentsService } from './shipmentsService.js'

const create = async (shipmentCrate, transaction) => {
  const { crateId, shipmentId } = shipmentCrate

  await cratesService.find(crateId, transaction)

  await shipmentsService.find(shipmentId, transaction)

  const shipmentCrateInDb = await ShipmentCrate.create(shipmentCrate, {
    transaction,
  })

  return shipmentCrateInDb
}

export const shipmentCratesService = {
  create,
}
