import { MaterialType } from '../../types/material'
import { ProjectType } from '../../types/project'

export interface AssemblyType {
  code?: number
  prefabricated: boolean
  project: ProjectType
  billOfMaterials: BillOfMaterialType[]
}

export interface BillOfMaterialType {
  id: number
  material?: MaterialType
  quantity?: number
}
