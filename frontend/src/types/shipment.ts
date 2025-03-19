import { ProjectType } from './project'

export interface ShipmentType {
  id: number
  trackingNumber: string
  project: ProjectType
}

export interface NewShipmentType
  extends Omit<ShipmentType, 'id' | 'project' | 'crates'> {
  projectId: number
}
