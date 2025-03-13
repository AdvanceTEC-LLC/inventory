import { AssemblyMaterialType } from './assemblyMaterial'
import { ProjectType } from './project'
import { NewStockType } from './stock'

export interface AssemblyType {
  id: number
  code: string
  project: ProjectType
  prefabricated: boolean
  billOfMaterials?: AssemblyMaterialType[]
}

export interface NewAssemblyType
  extends Omit<AssemblyType, 'id' | 'project' | 'billOfMaterials'> {
  projectId: number
  billOfMaterials: NewStockType[]
}
