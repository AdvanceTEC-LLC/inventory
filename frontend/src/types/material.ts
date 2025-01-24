import { DivisionType, NewDivisionType } from './division'
import { ManufacturerType, NewManufacturerType } from './manufacturer'

export interface MaterialType {
  id: number
  manufacturer: ManufacturerType
  name: string
  division: DivisionType
}

export interface NewMaterialType
  extends Omit<MaterialType, 'id' | 'manufacturer' | 'division'> {
  manufacturer: NewManufacturerType | number
  division: NewDivisionType | number
}
