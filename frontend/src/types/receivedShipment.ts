import { ManufacturerType } from './manufacturer'
import { MaterialCrateType, NewMaterialCrateType } from './materialCrate'
import { ProjectType } from './project'

export interface ReceivedShipmentType {
  id: number
  project: ProjectType
  trackingNumber: string
  orderAcknowledgement: string
  purchaseOrder: string
  salesOrder: string
  receivedDate: Date
  manufacturer: ManufacturerType
  materialCrates: MaterialCrateType[]
}

export interface NewReceivedShipmentType
  extends Omit<
    ReceivedShipmentType,
    | 'id'
    | 'project'
    | 'trackingNumber'
    | 'orderAcknowledgement'
    | 'purchaseOrder'
    | 'salesOrder'
    | 'manufacturer'
    | 'materialCrates'
  > {
  projectId: number
  trackingNumber?: string
  orderAcknowledgement?: string
  purchaseOrder?: string
  salesOrder?: string
  manufacturerId: number
  materialCrates: NewMaterialCrateType[]
}
