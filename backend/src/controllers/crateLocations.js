import { CrateLocation } from '../models/index.js'
import { crateLocationsService } from '../services/crateLocationsService.js'
import createGenericRouter from '../util/genericRouter.js'

export const crateLocationFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const crateLocationsRouter = createGenericRouter({
  model: CrateLocation,
  service: crateLocationsService,
  findOptions: crateLocationFindOptions,
})

export default crateLocationsRouter
