import { Crate, StagingArea, Assembly, AssemblyCrate } from '../models/index.js'
import { crateFindOptions } from './crates.js'
import { assemblyFindOptions } from './assemblies.js'
import { assemblyCratesService } from '../services/assemblyCratesService.js'
import { stagingAreaFindOptions } from './stagingAreas.js'
import createGenericRouter from '../util/genericRouter.js'

export const assemblyCrateFindOptions = {
  attributes: {
    exclude: ['crateId', 'stagingAreaId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Crate,
      as: 'crate',
      ...crateFindOptions,
    },
    {
      model: StagingArea,
      as: 'stagingArea',
      ...stagingAreaFindOptions,
    },
    {
      model: Assembly,
      as: 'assemblies',
      through: { attributes: [] },
      ...assemblyFindOptions,
    },
  ],
}

const assemblyCratesRouter = createGenericRouter({
  model: AssemblyCrate,
  service: assemblyCratesService,
  findOptions: assemblyCrateFindOptions,
})

export default assemblyCratesRouter
