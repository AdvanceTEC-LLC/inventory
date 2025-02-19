import { CrateType as DBCrateType } from '../../types/crate'
import { ManufacturerType } from '../../types/manufacturer'
import { MaterialType } from '../../types/material'
import { ProjectType } from '../../types/project'

export interface ShipmentType {
  type?: string
  trackingNumber?: number
  project?: ProjectType
  crates?: ReceivedCrateType[]
}

export interface ReceivedShipmentType {
  shipment?: ShipmentType
  receivedDate?: Date
  manufacturer?: ManufacturerType
}

export interface SentShipmentType {
  sendDate?: Date
  delivered?: boolean
  crates?: DBCrateType[]
}

export interface ReceivedCrateType {
  id: number
  number?: string
  stock?: StockType[]
  open: boolean
}

export interface StockType {
  id: number
  material?: MaterialType
  project?: ProjectType
  quantity?: number
}
