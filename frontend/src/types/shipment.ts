import { ProjectType } from './project'

export interface ShipmentType {
  id: number
  trackingNumber: number
  project: ProjectType
}

export interface NewShipmentType
  extends Omit<ShipmentType, 'id' | 'project' | 'crates'> {
  projectId: number
}
