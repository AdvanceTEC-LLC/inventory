import { CreateStockType, StockType } from './stock'

export interface AssemblyType {
  id: number
  assemblyId: string
  billOfMaterials: StockType[]
}

export interface CreateAssemblyType {
  assemblyId: string
  billOfMaterials: CreateStockType[]
}
