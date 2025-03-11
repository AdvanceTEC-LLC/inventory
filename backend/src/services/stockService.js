import { Stock } from '../models/index.js'
import { info } from '../util/logger.js'
import { materialsService } from './materialsService.js'
import { projectsService } from './projectsService.js'

const find = async (stockId, transaction) => {
  const stockInDb = await Stock.findByPk(stockId, { transaction })

  if (!stockInDb) {
    throw new CustomError(
      'NotFoundError',
      `Stock with id ${stockId} not found`,
      404,
    )
  }

  return stockInDb
}

const create = async (stock, transaction) => {
  info('ENTERING STOCK CREATE')

  const { materialId, projectId } = stock

  await materialsService.find(materialId, transaction)

  await projectsService.find(projectId, transaction)

  const stockInDb = await Stock.create(stock, {
    transaction,
  })

  return stockInDb
}

const update = async (stock, transaction) => {
  info('ENTERING STOCK UPDATE')

  const stockInDb = await Stock.update(stock, {
    where: { id: stock.id },
    transaction,
  })
  return stockInDb
}

const remove = async (stock, transaction) => {
  info('ENTERING STOCK REMOVE')
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
  info('ENTERING STOCK UPDATE OR REMOVE')
  const { quantity } = stock

  if (quantity <= 0) {
    return await remove(stock, transaction)
  }

  return await update(stock, transaction)
}

export const stockService = {
  find,
  create,
  deepCreate,
  updateOrRemove,
}
