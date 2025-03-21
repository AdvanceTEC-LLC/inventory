import { Dayjs } from 'dayjs'
import { ManufacturerType } from '../../../types/manufacturer'
import { MaterialType } from '../../../types/material'

export interface ReceivedShipmentType {
  trackingNumber: string
  receivedDate: Dayjs
  manufacturer: ManufacturerType | null
  materialCrates: CrateType[]
}

export interface CrateType {
  number: string
  stock: StockType[]
  open: boolean
}

export interface StockType {
  material: MaterialType | null
  quantity: number | null
}
