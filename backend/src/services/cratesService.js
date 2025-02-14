import { Crate } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { crateStocksService } from './crateStockService.js'
import { projectsService } from './projectsService.js'
import { shelfLocationsService } from './shelfLocationsService.js'
import { stagingAreasService } from './stagingAreasService.js'
import { stockService } from './stockService.js'
import { warehouseLocationsService } from './warehouseLocationsService.js'

const create = async (crate, transaction) => {
  let crateInDb = await Crate.findOne({
    where: { number: crate.number },
    transaction,
  })

  if (crateInDb) {
    throw new CustomError(
      'ValidationError',
      `Crate with number ${crate.number} already exists.`,
      400,
    )
  }

  crateInDb = await Crate.create(crate, { transaction })

  return crateInDb
}

const deepCreate = async (crate, transaction) => {
  let warehouseLocationInDb
  if (crate.warehouseLocation) {
    warehouseLocationInDb = await warehouseLocationsService.findOrCreate(
      crate.warehouseLocation,
      transaction,
    )
  }

  const defaultWarehouseLocation = await warehouseLocationsService.findOrCreate(
    { name: 'Shipping Bay', isDefault: true },
    transaction,
  )

  const warehouseLocationId = warehouseLocationInDb
    ? warehouseLocationInDb.id
    : defaultWarehouseLocation.id

  let shelfLocationInDb
  if (crate.shelfLocation) {
    shelfLocationInDb = await shelfLocationsService.findOrCreate(
      crate.shelfLocation,
      transaction,
    )
  }
  const shelfLocationId = shelfLocationInDb ? shelfLocationInDb.id : null

  let stagingAreaInDb
  if (crate.stagingArea) {
    stagingAreaInDb = await stagingAreasService.findOrCreate(
      crate.stagingArea,
      transaction,
    )
  }
  const stagingAreaId = stagingAreaInDb ? stagingAreaInDb.id : null

  const projectInDb = await projectsService.findOrCreate(
    crate.project,
    transaction,
  )

  const crateInDb = await create(
    {
      ...crate,
      warehouseLocationId,
      shelfLocationId,
      stagingAreaId,
      projectId: projectInDb.id,
    },
    transaction,
  )

  if (Array.isArray(crate.stock)) {
    await Promise.all(
      crate.stock.map(async (stock) => {
        const stockInDb = await stockService.deepCreate(
          {
            ...stock,
            project: crate.project,
          },
          transaction,
        )

        await crateStocksService.create(
          {
            crateId: crateInDb.id,
            stockId: stockInDb.id,
          },
          transaction,
        )
      }),
    )
  }

  return crateInDb
}

export const cratesService = {
  deepCreate,
}
