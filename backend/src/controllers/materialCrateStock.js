import { MaterialCrateStock, Stock, MaterialCrate } from '../models/index.js'
import { stockService } from '../services/index.js'
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
      ...stockService.findOptions,
    },
  ],
}

const materialCrateStockRouter = createGenericRouter({
  model: MaterialCrateStock,
  service: materialCrateStockService,
  findOptions: materialCrateStockFindOptions,
})

export default materialCrateStockRouter
