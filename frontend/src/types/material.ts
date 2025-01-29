import { ManufacturerType, NewManufacturerType } from './manufacturer'

export interface MaterialType {
  id: number
  manufacturer: ManufacturerType
  name: string
}

export interface NewMaterialType
  extends Omit<MaterialType, 'id' | 'manufacturer' | 'division'> {
  manufacturer: NewManufacturerType | number
}
