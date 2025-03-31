import { Material, Project, Stock } from '../models/index.js'
import { materialFindOptions } from './materials.js'
import { projectFindOptions } from './projects.js'
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
      ...materialFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const stockRouter = createGenericRouter({
  model: Stock,
  service: stockService,
  findOptions: stockFindOptions,
})

export default stockRouter
