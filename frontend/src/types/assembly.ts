import { ProjectType } from './project'
import { StockType } from './stock'

export interface AssemblyType {
  id: number
  code: string
  project: ProjectType
  prefabricated: boolean
  type: string
  billOfMaterials?: StockType[]
}

export interface NewAssemblyType
  extends Omit<AssemblyType, 'id' | 'project' | 'billOfMaterials'> {
  projectId: number
}
