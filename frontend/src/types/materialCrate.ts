import { NewStockType, StockType } from './stock'
import { CrateType, NewCrateType } from './crate'

export interface MaterialCrateType {
  id: number
  crate: CrateType
  opened: boolean
  stock: StockType[]
}

export interface NewMaterialCrateType
  extends Omit<MaterialCrateType, 'id' | 'crate' | 'stock'> {
  crate: NewCrateType
  stock: NewStockType[]
}
