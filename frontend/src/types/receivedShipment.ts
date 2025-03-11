import { ManufacturerType } from './manufacturer'
import { MaterialCrateType, NewMaterialCrateType } from './materialCrate'
import { NewShipmentType, ShipmentType } from './shipment'

export interface ReceivedShipmentType {
  id: number
  shipment: ShipmentType
  receivedDate: Date
  manufacturer: ManufacturerType
  materialCrates: MaterialCrateType[]
}

export interface NewReceivedShipmentType
  extends Omit<
    ReceivedShipmentType,
    'id' | 'shipment' | 'manufacturer' | 'materialCrates'
  > {
  shipment: NewShipmentType
  manufacturerId: number
  materialCrates: NewMaterialCrateType[]
}
