import { NewProjectType, ProjectType } from './project'
import { NewShelfLocationType, ShelfLocationType } from './shelfLocation'
import { NewStagingAreaType, StagingAreaType } from './stagingArea'
import { NewStockType, StockType } from './stock'
import {
  NewWarehouseLocationType,
  WarehouseLocationType,
} from './warehouseLocation'

export interface CrateType {
  id: number
  number: string
  warehouseLocation: WarehouseLocationType
  shelfLocation?: ShelfLocationType
  stagingArea?: StagingAreaType
  project: ProjectType
  opened: boolean
  stock: StockType[]
}

export interface NewCrateType
  extends Omit<
    CrateType,
    | 'id'
    | 'warehouseLocation'
    | 'shelfLocation'
    | 'stagingArea'
    | 'project'
    | 'stock'
  > {
  warehouseLocation: NewWarehouseLocationType | number
  shelfLocation?: NewShelfLocationType | number
  stagingArea?: NewStagingAreaType | number
  project: NewProjectType | number
  stock: NewStockType[]
}
