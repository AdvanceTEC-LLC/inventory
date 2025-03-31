import Manufacturer from '../models/manufacturer.js'
import { manufacturersService } from '../services/manufacturersService.js'
import createGenericRouter from '../util/genericRouter.js'

export const manufacturerFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const manufacturersRouter = createGenericRouter({
  model: Manufacturer,
  service: manufacturersService,
  findOptions: manufacturerFindOptions,
})

export default manufacturersRouter
