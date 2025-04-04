import { ShelfLocation } from '../models/index.js'
import { shelfLocationsService } from '../services/shelfLocationsService.js'
import createGenericRouter from '../util/genericRouter.js'

export const shelfLocationFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const shelfLocationsRouter = createGenericRouter({
  model: ShelfLocation,
  service: shelfLocationsService,
  findOptions: shelfLocationFindOptions,
})

export default shelfLocationsRouter
