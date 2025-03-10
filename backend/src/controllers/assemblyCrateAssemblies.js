import {
  AssemblyCrateAssemblies,
  Assembly,
  AssemblyCrate,
} from '../models/index.js'
import { assemblyCrateAssembliesService } from '../services/assemblyCratesAssembliesService.js'
import createGenericRouter from '../util/genericRouter.js'
import { assemblyFindOptions } from './assemblies.js'
import { assemblyCrateFindOptions } from './assemblyCrates.js'

const assemblyCrateAssembliesFindOptions = {
  attributes: {
    exclude: ['assemblyCrateId', 'assemblyId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: AssemblyCrate,
      as: 'assemblyCrate',
      ...assemblyCrateFindOptions,
    },
    {
      model: Assembly,
      as: 'assembly',
      ...assemblyFindOptions,
    },
  ],
}

const assemblyCrateAssembliesRouter = createGenericRouter({
  model: AssemblyCrateAssemblies,
  service: assemblyCrateAssembliesService,
  findOptions: assemblyCrateAssembliesFindOptions,
})

export default assemblyCrateAssembliesRouter
