import { AssemblyType } from './assembly'
import { MaterialType } from './material'

export interface AssemblyMaterialType {
  id: number
  assembly: AssemblyType
  material: MaterialType
  quantity: number
}

export interface NewAssemblyMaterialType
  extends Omit<AssemblyType, 'id' | 'assembly' | 'material'> {
  assemblyId: number
  materialId: number
}
