import { WarehouseLocation } from '../models/index.js'

const findOrCreate = async (warehouseLocation, transaction) => {
  let warehouseLocationInDb = await WarehouseLocation.findOne({
    where: { name: warehouseLocation.name },
    transaction,
  })

  if (!warehouseLocationInDb) {
    warehouseLocationInDb = await WarehouseLocation.create(warehouseLocation, {
      transaction,
    })
  }

  return warehouseLocationInDb
}

export const warehouseLocationsService = {
  findOrCreate,
}
