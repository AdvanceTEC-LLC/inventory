export interface WarehouseLocationType {
  id: number
  name: string
}

export type NewWarehouseLocationType = Omit<WarehouseLocationType, 'id'>
