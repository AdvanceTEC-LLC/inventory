import { AssemblyCrateType } from './assemblyCrate'
import { NewShipmentType, ShipmentType } from './shipment'

export interface SentShipmentType {
  id: number
  shipment: ShipmentType
  sendDate: Date
  delivered: boolean
  assemblyCrates: AssemblyCrateType[]
}

export interface NewSentShipmentType
  extends Omit<SentShipmentType, 'id' | 'shipment' | 'assemblyCrates'> {
  shipment: NewShipmentType | number
  assemblyCrates: AssemblyCrateType[]
}
