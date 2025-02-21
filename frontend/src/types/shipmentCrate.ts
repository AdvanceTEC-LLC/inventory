import { CrateType } from './crate'
import { ShipmentType } from './shipment'

export interface ShipmentCrateType {
  id: number
  shipment: ShipmentType
  crate: CrateType
}

export interface NewShipmentCrateType
  extends Omit<ShipmentType, 'id' | 'shipment' | 'crate'> {
  shipmentId: number
  crateId: number
}
