import { MaterialCrate } from '../models/index.js'
import { info } from '../util/logger.js'
import { crateLocationsService } from './crateLocationsService.js'
import { cratesService } from './cratesService.js'
import { materialCrateStockService } from './materialCrateStockService.js'
import { stockService } from './index.js'
import { NotFoundError } from '../util/errors/index.js'

const find = async (materialCrateId, transaction) => {
  const materialCrateInDb = await MaterialCrate.findByPk(materialCrateId, {
    transaction,
  })

  if (!materialCrateInDb) {
    throw new NotFoundError('Material crate', materialCrateId)
  }

  return materialCrateInDb
}

const create = async (materialCrate, transaction) => {
  info('ENTERING MATERIAL CRATE CREATE')

  await cratesService.find(materialCrate.crateId, transaction)

  const materialCrateInDb = await MaterialCrate.create(materialCrate, {
    transaction,
  })

  return materialCrateInDb
}

const deepCreate = async (materialCrate, transaction) => {
  info('ENTERING MATERIAL CRATE DEEP CREATE')

  const { crate, stock, opened } = materialCrate

  let { crateLocationId } = crate
  if (!crateLocationId) {
    const defaultLocation =
      await crateLocationsService.findMaterialCrateDefault(transaction)
    crateLocationId = defaultLocation.id
  }

  const crateInDb = await cratesService.create(
    { ...crate, crateLocationId },
    transaction,
  )

  const materialCrateInDb = await create(
    { crateId: crateInDb.id, opened },
    transaction,
  )

  await Promise.all(
    stock.map(async (stock) => {
      const stockInDb = await stockService.create(stock, transaction)

      await materialCrateStockService.create(
        {
          materialCrateId: materialCrateInDb.id,
          stockId: stockInDb.id,
        },
        transaction,
      )
    }),
  )

  return materialCrateInDb
}

const bulkUpdate = async (materialCrates, transaction) => {
  info('ENTERING MATERIAL CRATE BULK UPDATE')

  const updatedCrates = await Promise.all(
    materialCrates.map(async (materialCrate) => {
      await MaterialCrate.update(materialCrate, {
        where: { id: materialCrate.id },
        transaction,
      })

      await Promise.all(
        materialCrate.stock.map(async (stock) => {
          await stockService.updateOrRemove(stock, transaction)
        }),
      )
    }),
  )
  return updatedCrates
}

export const materialCratesService = {
  find,
  create,
  deepCreate,
  bulkUpdate,
}
