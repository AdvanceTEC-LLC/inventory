import { CrateType } from './crate'
import { ProjectType } from './project'

export interface ShipmentType {
  id: number
  trackingNumber: number
  project: ProjectType
  crates: CrateType[]
}

export interface NewShipmentType
  extends Omit<ShipmentType, 'id' | 'project' | 'crates'> {
  projectId: number
}
