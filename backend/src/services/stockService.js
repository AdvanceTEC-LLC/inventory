import { Material, Stock } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { crateStocksService } from './crateStockService.js'
import { materialsService } from './materialsService.js'
import { projectsService } from './projectsService.js'

const create = async (stock, transaction) => {
  const { materialId } = stock

  const materialInDb = await Material.findByPk(materialId, { transaction })

  if (!materialInDb) {
    throw new CustomError(
      'NotFoundError',
      `Material with id ${materialId} not found`,
      404,
    )
  }

  const stockInDb = await Stock.create(stock, {
    transaction,
  })

  return stockInDb
}

const deepCreate = async (stock, transaction) => {
  const { material, project } = stock

  info(stock)

  const materialInDb = await materialsService.deepCreate(material, transaction)

  const projectInDb = await projectsService.findOrCreate(project, transaction)

  const stockInDb = await create(
    {
      ...stock,
      materialId: materialInDb.id,
      projectId: projectInDb.id,
    },
    transaction,
  )

  return stockInDb
}

const update = async (stock, transaction) => {
  info(stock)

  const stockInDb = await Stock.update(stock, {
    where: { id: stock.id },
    transaction,
  })

  return stockInDb
}

export const stockService = {
  create,
  deepCreate,
  update,
}
