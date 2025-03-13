import { Router } from 'express'
import {
  MaterialCrateStock,
  Crate,
  Stock,
  MaterialCrate,
} from '../models/index.js'
//import { crateFindOptions } from './crates.js'
import { stockFindOptions } from './stock.js'
import { CustomError } from '../util/errors/CustomError.js'
const materialCrateStockRouter = Router()

const materialCrateStockFindOptions = {
  attributes: {
    exclude: ['materialCrateId', 'stockId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: MaterialCrate,
      as: 'materialCrate',
      //...crateFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      ...stockFindOptions,
    },
  ],
}

const crateStockFinder = async (request, _response, next) => {
  const { id } = request.params
  const crateStock = await MaterialCrateStock.findByPk(
    id,
    materialCrateStockFindOptions,
  )

  if (!crateStock) {
    throw new CustomError(
      'NotFoundError',
      `Crate Stock with id ${id} not found`,
      404,
    )
  }
  request.crateStock = crateStock
  next()
}

materialCrateStockRouter.get('/', async (_request, response) => {
  const crate = await MaterialCrateStock.findAll(materialCrateStockFindOptions)

  response.status(200).send(crate)
})

materialCrateStockRouter.get(
  '/:id',
  crateStockFinder,
  async (request, response) => {
    response.status(200).send(request.crateStock)
  },
)

materialCrateStockRouter.post('/', async (request, response) => {
  const { crateId, stockId } = request.body

  const crateExists = await Crate.findByPk(crateId)

  if (!crateExists) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found`,
      404,
    )
  }

  const stockExists = await Stock.findByPk(stockId)

  if (!stockExists) {
    throw new CustomError(
      'NotFoundError',
      `Stock with id ${stockId} not found`,
      404,
    )
  }

  const crateStock = await MaterialCrateStock.create({
    crateId,
    stockId,
  })

  response.status(201).send(crateStock)
})

materialCrateStockRouter.delete(
  '/:id',
  crateStockFinder,
  async (request, response) => {
    await request.crateStock.destroy()
    response
      .status(204)
      .json({ message: 'Crate stock entry deleted successfully' })
  },
)

materialCrateStockRouter.delete('/', async (request, response) => {
  await MaterialCrateStock.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All crate stock deleted successfully' })
})

export default materialCrateStockRouter
