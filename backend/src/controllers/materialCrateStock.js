import { MaterialCrateStock, Stock, MaterialCrate } from '../models/index.js'
import { stockFindOptions } from './stock.js'
import createGenericRouter from '../util/genericRouter.js'
import { materialCrateStockService } from '../services/materialCrateStockService.js'

const materialCrateStockFindOptions = {
  attributes: {
    exclude: ['materialCrateId', 'stockId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: MaterialCrate,
      as: 'materialCrate',
      //...materialCrateFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      ...stockFindOptions,
    },
  ],
}

const materialCrateStockRouter = createGenericRouter({
  model: MaterialCrateStock,
  service: materialCrateStockService,
  findOptions: materialCrateStockFindOptions,
})

export default materialCrateStockRouter
