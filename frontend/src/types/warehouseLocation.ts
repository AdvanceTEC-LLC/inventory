export interface WarehouseLocationType {
  id: number
  name: string
}

export interface NewWarehouseLocationType
  extends Omit<WarehouseLocationType, 'id'> {}
