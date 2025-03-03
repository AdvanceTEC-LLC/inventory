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
    cascade: true,
    transaction,
  })

  return stockInDb
}

const update = async (stock, transaction) => {
  const stockInDb = await Stock.update(stock, {
    where: { id: stock.id },
    transaction,
  })
  return stockInDb
}

const remove = async (stock, transaction) => {
  //await crateStocksService.removeStock(stock, transaction)

  await Stock.destroy({
    where: { id: stock.id },
    transaction,
  })
}

const deepCreate = async (stock, transaction) => {
  const { material, project } = stock

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

const updateOrRemove = async (stock, transaction) => {
  const { quantity } = stock

  if (quantity <= 0) {
    return await remove(stock, transaction)
  }

  return await update(stock, transaction)
}

export const stockService = {
  create,
  deepCreate,
  updateOrRemove,
}
