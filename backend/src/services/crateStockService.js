import { Crate, CrateStock, Stock } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'

const create = async (crateStock, transaction) => {
  const { stockId, crateId } = crateStock

  const crateInDb = await Crate.findByPk(crateId, { transaction })

  if (!crateInDb) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found`,
      404,
    )
  }

  const stockInDb = await Stock.findByPk(stockId, { transaction })

  if (!stockInDb) {
    throw new CustomError(
      'NotFoundError',
      `Stock with id ${stockId} not found`,
      404,
    )
  }

  const crateStockInDb = await CrateStock.create(crateStock, { transaction })

  return crateStockInDb
}

const removeStock = async (stock, transaction) => {
  await CrateStock.destroy({
    where: { stockId: stock.id },
    transaction,
  })
}

const createBatch = async (crateStock, transaction) => {
  const { stock, crate } = crateStock

  const crateInDb = await Crate.create(crate, { transaction })
  const stockInDb = await Stock.create(stock, { transaction })

  const newCrateStock = {
    crateId: crateInDb.id,
    stockId: stockInDb.id,
  }

  const crateStockInDb = await CrateStock.create(newCrateStock, { transaction })

  return crateStockInDb
}

export const crateStocksService = {
  create,
  removeStock,
  createBatch,
}
