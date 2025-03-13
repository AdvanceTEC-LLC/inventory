import { AssemblyCrateAssemblies } from '../models/index.js'
import { info } from '../util/logger.js'
import { assembliesService } from './assembliesService.js'
import { assemblyCratesService } from './assemblyCratesService.js'

const create = async (assemblyCrateAssembly, transaction) => {
  info('ENTERING ASSEMBLY CRATE ASSEMBLY CREATE')
  const { assemblyCrateId, assemblyId } = assemblyCrateAssembly

  await assemblyCratesService.find(assemblyCrateId)

  await assembliesService.find(assemblyId)

  const assemblyCrateAssemblyInDb = await AssemblyCrateAssemblies.create(
    assemblyCrateAssembly,
    { transaction },
  )

  return assemblyCrateAssemblyInDb
}

export const assemblyCrateAssembliesService = {
  create,
}
