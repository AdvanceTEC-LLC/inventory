export interface ManufacturerType {
  id: number
  name: string
}

export interface NewManufacturerType extends Omit<ManufacturerType, 'id'> {}
