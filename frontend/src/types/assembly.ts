import { CreateProjectType, ProjectType } from './project'
import { CreateStockType, StockType } from './stock'

export interface AssemblyType {
  id: number
  identifier: string
  billOfMaterials: StockType[]
  project: ProjectType
}

export interface CreateAssemblyType {
  identifier: string
  billOfMaterials: CreateStockType[]
  project: CreateProjectType
}
