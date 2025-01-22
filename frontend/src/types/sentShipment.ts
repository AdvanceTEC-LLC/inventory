import { ShipmentType } from './shipment'

export interface SentShipmentType {
  id: number
  shipment: ShipmentType
  sendDate: Date
  delivered: boolean
}

export interface NewSentShipmentType
  extends Omit<SentShipmentType, 'id' | 'shipment'> {
  shipmentId: number
}
