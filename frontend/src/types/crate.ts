import { LocationType } from './location'
import { ProjectType } from './project'
import { StockType } from './stock'

export interface CrateType {
  id: number
  number: string
  location: LocationType
  project: ProjectType
}

export interface CreateCrateType {
  number: string
  locationId: number
  projectId: number
}

export interface CrateDetailsType {
  id: number
  number: string
  location: LocationType
  project: ProjectType
  stock: StockType[]
}
