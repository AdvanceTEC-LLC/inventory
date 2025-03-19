import { AssemblyCrateType } from '../../types/assemblyCrate'
import { ManufacturerType } from '../../types/manufacturer'
import { MaterialType } from '../../types/material'
import { ProjectType } from '../../types/project'

export interface ShipmentType {
  trackingNumber?: string
  project?: ProjectType
}

export interface ReceivedShipmentType {
  shipment?: ShipmentType
  receivedDate?: Date
  manufacturer?: ManufacturerType
  materialCrates?: ReceivedMaterialCrateType[]
}

export interface SentShipmentType {
  shipment?: ShipmentType
  sendDate?: Date
  delivered?: boolean
  assemblyCrates?: AssemblyCrateType[]
}

export interface ReceivedMaterialCrateType {
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
