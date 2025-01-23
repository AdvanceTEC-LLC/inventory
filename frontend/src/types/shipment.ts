import { CrateType } from './crate'
import { ProjectType } from './project'

export interface ShipmentType {
  id: number
  trackingNumber: number
  project: ProjectType
  crates: CrateType[]
}

export interface NewShipment
  extends Omit<ShipmentType, 'id' | 'project' | 'crates'> {
  projectId: number
}

export interface CreateSendingShipmentType {
  direction: ShipmentDirectionEnum.Out
  sendDate: Date
  project: ProjectType
  crates: CrateType[]
  vendor: CreateVendorType
}
