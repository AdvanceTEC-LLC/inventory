import { Assembly, AssemblyMaterial, Material } from '../models/index.js'
import { assemblyMaterialsService } from '../services/assemblyMaterialsService.js'
import createGenericRouter from '../util/genericRouter.js'
import { materialFindOptions } from './material.controller.js'

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
      ...materialFindOptions,
    },
  ],
}

const assemblyMaterialsRouter = createGenericRouter({
  model: AssemblyMaterial,
  service: assemblyMaterialsService,
  findOptions: assemblyMaterialFindOptions,
})

export default assemblyMaterialsRouter
