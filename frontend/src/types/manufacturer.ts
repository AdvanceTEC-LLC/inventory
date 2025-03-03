export interface ManufacturerType {
  id: number
  name: string
}

export type NewManufacturerType = Omit<ManufacturerType, 'id'>
