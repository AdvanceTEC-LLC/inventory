import { AssemblyCrate, Project, SentShipment } from '../models/index.js'
import { assemblyCrateFindOptions } from './assemblyCrates.js'
import createGenericRouter from '../util/genericRouter.js'
import { sentShipmentsService } from '../services/sentShipmentsService.js'
import { projectFindOptions } from './projects.js'

export const sentShipmentFindOptions = {
  attributes: { exclude: ['projectId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: AssemblyCrate,
      as: 'assemblyCrates',
      through: { attributes: [] },
      ...assemblyCrateFindOptions,
    },
  ],
}

const sentShipmentsRouter = createGenericRouter({
  model: SentShipment,
  service: sentShipmentsService,
  findOptions: sentShipmentFindOptions,
})

export default sentShipmentsRouter
