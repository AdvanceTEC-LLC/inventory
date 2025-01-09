import { CreateMaterialType, MaterialType } from './material'

export interface StockType {
  id: number
  material: MaterialType
  quantity: number
}

export interface CreateStockType {
  material: CreateMaterialType
  quantity: number
}
