import {
  Manufacturer,
  ReceivedShipment,
  MaterialCrate,
  Project,
} from '../models/index.js'
import { receivedShipmentsService } from '../services/receivedShipmentsService.js'
import createGenericRouter from '../util/genericRouter.js'
import { manufacturerFindOptions } from './manufacturers.js'
import { materialCrateFindOptions } from './materialCrates.js'
import { projectFindOptions } from './projects.js'

export const receivedShipmentFindOptions = {
  attributes: {
    exclude: ['manufacturerId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: MaterialCrate,
      as: 'materialCrates',
      through: { attributes: [] },
      ...materialCrateFindOptions,
    },
  ],
}

const receivedShipmentsRouter = createGenericRouter({
  model: ReceivedShipment,
  service: receivedShipmentsService,
  findOptions: receivedShipmentFindOptions,
})

export default receivedShipmentsRouter
