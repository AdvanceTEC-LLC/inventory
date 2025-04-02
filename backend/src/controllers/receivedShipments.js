import {
  Manufacturer,
  ReceivedShipment,
  MaterialCrate,
  Project,
} from '../models/index.js'
import { receivedShipmentsService } from '../services/receivedShipmentsService.js'
import createGenericRouter from '../util/genericRouter.js'
import { manufacturerService } from '../services/index.js'
import { materialCrateFindOptions } from './materialCrates.js'
import { projectService } from '../services/index.js'

export const receivedShipmentFindOptions = {
  attributes: {
    exclude: ['manufacturerId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerService.findOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectService.findOptions,
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
