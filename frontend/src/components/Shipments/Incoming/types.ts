import { Dayjs } from 'dayjs'
import { ManufacturerType } from '../../../types/manufacturer'
import { MaterialType } from '../../../types/material'

export interface ReceivedShipmentType {
  trackingNumber: string
  receivedDate: Dayjs
  manufacturer: ManufacturerType
  crates: CrateType[]
}

export interface CrateType {
  id: number
  number: string
  stock: StockType[]
  open: boolean
}

export interface StockType {
  id: number
  material: MaterialType | null
  quantity: number
}
