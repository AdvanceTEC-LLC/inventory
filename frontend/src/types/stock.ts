import { MaterialType, NewMaterialType } from './material'

export interface StockType {
  id: number
  material: MaterialType
  quantity: number
}

export interface NewStockType extends Omit<StockType, 'id' | 'material'> {
  material: NewMaterialType
}
