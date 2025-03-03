export interface ShelfLocationType {
  id: number
  side: string
  aisle: number
  col: string
  shelf: number
}

export type NewShelfLocationType = Omit<ShelfLocationType, 'id'>
