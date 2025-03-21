import { AssemblyCrateType } from '../../types/assemblyCrate'
import { ProjectType } from '../../types/project'

export interface ShipmentType {
  trackingNumber?: string
  project?: ProjectType
}

export interface SentShipmentType {
  shipment?: ShipmentType
  sendDate?: Date
  delivered?: boolean
  assemblyCrates?: AssemblyCrateType[]
}
