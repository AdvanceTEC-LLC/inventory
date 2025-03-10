import createGenericRouter from '../util/genericRouter.js'
import { MaterialCrate, Crate, Stock } from '../models/index.js'
import { materialCratesService } from '../services/materialCratesService.js'
import { crateFindOptions } from './crates.js'
import { stockFindOptions } from './stock.js'

export const materialCrateFindOptions = {
  attributes: {
    exclude: ['crateId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Crate,
      as: 'crate',
      ...crateFindOptions,
    },
    {
      model: Stock,
      as: 'stock',
      through: { attributes: [] },
      ...stockFindOptions,
    },
  ],
}

const materialCratesRouter = createGenericRouter({
  model: MaterialCrate,
  service: materialCratesService,
  findOptions: materialCrateFindOptions,
})

export default materialCratesRouter
