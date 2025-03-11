import { Crate, MaterialCrateStock, Stock } from '../models/index.js'
import { materialCratesService } from './materialCratesService.js'
import { stockService } from './stockService.js'

const create = async (materialCrateStock, transaction) => {
  const { stockId, materialCrateId } = materialCrateStock

  await materialCratesService.find(materialCrateId, transaction)

  await stockService.find(stockId, transaction)

  const materialCrateStockInDb = await MaterialCrateStock.create(
    materialCrateStock,
    { transaction },
  )

  return materialCrateStockInDb
}

const removeStock = async (stock, transaction) => {
  await MaterialCrateStock.destroy({
    where: { stockId: stock.id },
    transaction,
  })
}

const createBatch = async (materialCrateStock, transaction) => {
  const { stock, crate } = materialCrateStock

  const crateInDb = await Crate.create(crate, { transaction })
  const stockInDb = await Stock.create(stock, { transaction })

  const newmaterialCrateStock = {
    crateId: crateInDb.id,
    stockId: stockInDb.id,
  }

  const materialCrateStockInDb = await MaterialCrateStock.create(
    newmaterialCrateStock,
    { transaction },
  )

  return materialCrateStockInDb
}

export const materialCrateStockService = {
  create,
  removeStock,
  createBatch,
}
