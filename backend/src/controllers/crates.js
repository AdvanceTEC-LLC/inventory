import {
  Crate,
  ShelfLocation,
  Project,
  CrateLocation,
} from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { shelfLocationFindOptions } from './shelfLocations.js'
import { crateLocationFindOptions } from './crateLocations.js'
import createGenericRouter from '../util/genericRouter.js'
import { cratesService } from '../services/cratesService.js'

export const crateFindOptions = {
  attributes: {
    exclude: [
      'crateLocationId',
      'shelfLocationId',
      'projectId',
      'vendorId',
      'createdAt',
      'updatedAt',
    ],
  },
  include: [
    {
      model: CrateLocation,
      as: 'crateLocation',
      ...crateLocationFindOptions,
    },
    {
      model: ShelfLocation,
      as: 'shelfLocation',
      ...shelfLocationFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const crateRouter = createGenericRouter({
  model: Crate,
  service: cratesService,
  findOptions: crateFindOptions,
})

export default crateRouter
