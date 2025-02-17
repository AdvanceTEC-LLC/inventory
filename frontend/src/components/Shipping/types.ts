import { CrateType as DBCrateType } from '../../types/crate'
import { ManufacturerType } from '../../types/manufacturer'
import { MaterialType } from '../../types/material'

export interface ShipmentType {
  type?: string
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

export interface ProjectType {
  number: number
  name: string
}

export interface StockType {
  id: number
  material?: MaterialType
  quantity?: number
}
