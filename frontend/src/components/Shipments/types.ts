import { ProjectType } from '../../types/project'

export interface ShipmentType {
  trackingNumber?: string
  project?: ProjectType
}
