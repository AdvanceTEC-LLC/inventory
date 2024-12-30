import { LocationType } from './location'
import { ProjectType } from './project'
import { StockType } from './stock'

export interface CrateType {
  id: number
  number: string
  location: LocationType
  project: ProjectType
  stock: StockType[]
}

export interface CreateCrateType {
  number: string
  locationId: number
  projectId: number
}
