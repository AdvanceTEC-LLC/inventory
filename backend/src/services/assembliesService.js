import { Assembly } from '../models/index.js'
import { info } from '../util/logger.js'
import { assemblyMaterialsService } from './assemblyMaterialsService.js'

const find = async (assemblyId, transaction) => {
  info('ENTERING ASSEMBLY FIND')

  const assemblyInDb = await Assembly.findByPk(assemblyId, {
    transaction,
  })

  if (!assemblyInDb) {
    throw new NotFoundError('Assembly', assemblyId)
  }

  return assemblyInDb
}

const create = async (assembly, transaction) => {
  const assemblyInDb = await Assembly.create(assembly, { transaction })

  return assemblyInDb
}

const deepCreate = async (assembly, transaction) => {
  const { code, prefabricated, type, projectId, billOfMaterials } = assembly

  const assemblyInDb = await create(
    { code, prefabricated, type, projectId },
    transaction,
  )

  if (Array.isArray(billOfMaterials)) {
    await Promise.all(
      billOfMaterials.map(async ({ materialId, quantity }) => {
        await assemblyMaterialsService.create(
          {
            assemblyId: assemblyInDb.id,
            materialId,
            quantity,
          },
          transaction,
        )
      }),
    )
  }

  return assemblyInDb
}

const update = async (assembly, transaction) => {
  const { id, code, prefabricated, project, billOfMaterials } = assembly

  const updatedAssembly = {
    id,
    code,
    prefabricated,
    project,
  }

  const updatedAssemblyInDb = await Assembly.update(updatedAssembly, {
    where: { id: updatedAssembly.id },
    transaction,
  })

  return updatedAssemblyInDb
}

export const assembliesService = {
  find,
  deepCreate,
  update,
}
