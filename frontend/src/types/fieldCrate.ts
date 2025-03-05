import { AssemblyType } from './assembly'
import { ProjectType } from './project'
import { ShelfLocationType } from './shelfLocation'
import { StagingAreaType } from './stagingArea'
import { WarehouseLocationType } from './warehouseLocation'

export interface FieldCrateType {
  id: number
  number: string
  warehouseLocation: WarehouseLocationType
  shelfLocation?: ShelfLocationType
  stagingArea?: StagingAreaType
  project: ProjectType
  contents: AssemblyType[]
}

export interface NewFieldCrateType
  extends Omit<FieldCrateType, 'id' | 'project' | 'contents'> {
  projectId: number
  contents?: AssemblyType[]
}
