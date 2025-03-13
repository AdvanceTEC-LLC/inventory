import { ProjectType } from './project'
import { ShelfLocationType } from './shelfLocation'
import { CrateLocationType } from './crateLocation'

export interface CrateType {
  id: number
  number: string
  crateLocation: CrateLocationType
  shelfLocation?: ShelfLocationType
  project: ProjectType
}

export interface NewCrateType
  extends Omit<
    CrateType,
    'id' | 'crateLocation' | 'shelfLocation' | 'project' | 'stock'
  > {
  crateLocationId?: number
  shelfLocationId?: number
  projectId: number
}
