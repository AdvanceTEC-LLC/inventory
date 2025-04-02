import { Assembly, AssemblyMaterial, Material } from '../models/index.js'
import { assemblyMaterialsService } from '../services/assemblyMaterialsService.js'
import createGenericRouter from '../util/genericRouter.js'
import { materialService } from '../services/index.js'

export const assemblyMaterialFindOptions = {
  attributes: {
    exclude: ['assemblyId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Assembly,
      as: 'assembly',
      //...assemblyFindOptions,
    },
    {
      model: Material,
      as: 'material',
      ...materialService.findOptions,
    },
  ],
}

const assemblyMaterialsRouter = createGenericRouter({
  model: AssemblyMaterial,
  service: assemblyMaterialsService,
  findOptions: assemblyMaterialFindOptions,
})

export default assemblyMaterialsRouter
