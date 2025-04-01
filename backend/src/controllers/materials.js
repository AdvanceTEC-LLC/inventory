import { Material, Manufacturer } from '../models/index.js'
import { manufacturerFindOptions } from '../services/manufacturer.service.js'
import { materialsService } from '../services/materialsService.js'
import createGenericRouter from '../util/genericRouter.js'

export const materialFindOptions = {
  attributes: {
    exclude: ['manufacturerId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerFindOptions,
    },
  ],
}

const materialsRouter = createGenericRouter({
  model: Material,
  service: materialsService,
  findOptions: materialFindOptions,
})

export default materialsRouter
