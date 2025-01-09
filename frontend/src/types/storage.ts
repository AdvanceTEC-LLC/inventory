export interface StorageType {
  id: number
  aisle: number
  col: string
  shelf: number
}

export interface CreateStorageType {
  aisle: number
  col: string
  shelf: number
}
