import { MaterialType } from './material'
import { ProjectType } from './project'

export interface StockType {
  id: number
  material: MaterialType
  quantity: number
  project: ProjectType
}

export interface NewStockType
  extends Omit<StockType, 'id' | 'material' | 'project'> {
  materialId: number
  projectId: number
}
