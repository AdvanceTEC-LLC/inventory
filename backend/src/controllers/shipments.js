import { Shipment, Project } from '../models/index.js'
import { projectService } from '../services/index.js'
import { shipmentsService } from '../services/shipmentsService.js'
import createGenericRouter from '../util/genericRouter.js'

export const shipmentFindOptions = {
  attributes: {
    exclude: ['projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectService.findOptions,
    },
  ],
}

const shipmentsRouter = createGenericRouter({
  model: Shipment,
  service: shipmentsService,
  findOptions: shipmentFindOptions,
})

export default shipmentsRouter
