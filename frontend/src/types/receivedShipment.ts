import { ManufacturerType, NewManufacturerType } from './manufacturer'
import { NewShipmentType, ShipmentType } from './shipment'

export interface ReceivedShipmentType {
  id: number
  shipment: ShipmentType
  receivedDate: Date
  manufacturer?: ManufacturerType
}

export interface NewReceivedShipmentType
  extends Omit<ReceivedShipmentType, 'id' | 'shipment' | 'manufacturer'> {
  shipment: NewShipmentType
  manufacturer: NewManufacturerType
}
