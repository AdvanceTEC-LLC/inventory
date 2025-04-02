import { Material, Project, Stock } from '../models/index.js'
import { materialService, projectService } from '../services/index.js'
import { stockService } from '../services/stockService.js'
import createGenericRouter from '../util/genericRouter.js'

export const stockFindOptions = {
  attributes: {
    exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Material,
      as: 'material',
      ...materialService.findOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectService.findOptions,
    },
  ],
}

const stockRouter = createGenericRouter({
  model: Stock,
  service: stockService,
  findOptions: stockFindOptions,
})

export default stockRouter
