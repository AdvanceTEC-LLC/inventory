import { Shipment, Project } from '../models/index.js'
import { projectFindOptions } from './project.controller.js'
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
      ...projectFindOptions,
    },
  ],
}

const shipmentsRouter = createGenericRouter({
  model: Shipment,
  service: shipmentsService,
  findOptions: shipmentFindOptions,
})

export default shipmentsRouter
