import { CrateType } from './crate'
import { StockType } from './stock'

export interface CrateStockType {
  id: number
  crate: CrateType
  stock: StockType
}

export interface NewCrateStockType
  extends Omit<CrateStockType, 'id' | 'crate' | 'stock'> {
  crateId: number
  stockId: number
}
