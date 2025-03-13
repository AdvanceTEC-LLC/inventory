import { ReceivedShipmentMaterialCrate } from '../models/index.js'
import { materialCratesService } from './materialCratesService.js'
import { receivedShipmentsService } from './receivedShipmentsService.js'

const create = async (receivedShipmentMaterialCrate, transaction) => {
  const { materialCrateId, receivedShipmentId } = receivedShipmentMaterialCrate

  await materialCratesService.find(materialCrateId, transaction)

  await receivedShipmentsService.find(receivedShipmentId, transaction)

  const receivedShipmentMaterialCrateInDb =
    await ReceivedShipmentMaterialCrate.create(receivedShipmentMaterialCrate, {
      transaction,
    })

  return receivedShipmentMaterialCrateInDb
}

export const receivedShipmentMaterialCratesService = {
  create,
}
