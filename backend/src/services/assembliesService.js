import { Assembly } from '../models/index.js'
import { assemblyMaterialsService } from './assemblyMaterialsService.js'

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
      billOfMaterials.map(async ({ material, quantity }) => {
        await assemblyMaterialsService.create(
          {
            assemblyId: assemblyInDb.id,
            materialId: material.id,
            quantity,
          },
          transaction,
        )
      }),
    )
  }

  return assemblyInDb
}

export const assembliesService = {
  deepCreate,
}
