import { AssemblyMaterial } from '../models/index.js'

const create = async (assemblyMaterial, transaction) => {
  const assemblyMaterialInDb = await AssemblyMaterial.create(assemblyMaterial, {
    transaction,
  })

  return assemblyMaterialInDb
}

export const assemblyMaterialsService = {
  create,
}
