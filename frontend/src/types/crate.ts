import { CreateStorageType, StorageType } from './storage'
import { CreateProjectType, ProjectType } from './project'
import { CreateStockType, StockType } from './stock'
import { CreateVendorType, VendorType } from './vendor'

export enum CrateLocationEnum {
  ShippingBay = 'Shipping Bay',
  Storage = 'Storage',
  StagingZone1 = 'Staging Zone 1',
  StagingZone2 = 'Staging Zone 2',
  InTransit = 'In Transit',
  Delivered = 'Delivered',
}

export interface CrateType {
  id: number
  number: string
  location: CrateLocationEnum
  storage: StorageType
  project: ProjectType
  vendor: VendorType
  stock: StockType[]
}

export interface CreateCrateType {
  number: string
  location: CrateLocationEnum
  storage?: CreateStorageType
  project: CreateProjectType
  vendor: CreateVendorType
  stock: CreateStockType[]
}
