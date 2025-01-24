import { ProjectType } from './project'
import { ShelfLocationType } from './shelfLocation'
import { StagingAreaType } from './stagingArea'
import { NewStockType, StockType } from './stock'
import { WarehouseLocationType } from './warehouseLocation'

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
  warehouseLocationId: number
  shelfLocationId?: number
  stagingAreaId?: number
  projectId: number
  stock?: NewStockType
}
