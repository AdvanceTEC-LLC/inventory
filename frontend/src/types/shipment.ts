import { CrateType, NewCrateType } from './crate'
import { NewProjectType, ProjectType } from './project'

export interface ShipmentType {
  id: number
  trackingNumber: number
  project: ProjectType
  crates: CrateType[]
}

export interface NewShipmentType
  extends Omit<ShipmentType, 'id' | 'project' | 'crates'> {
  project: NewProjectType
  crates: NewCrateType[]
}
