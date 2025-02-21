export interface ShelfLocationType {
  id: number
  side: string
  aisle: number
  col: string
  shelf: number
}

export interface NewShelfLocationType extends Omit<ShelfLocationType, 'id'> {}
