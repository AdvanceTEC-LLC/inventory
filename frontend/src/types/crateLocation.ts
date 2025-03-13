export interface CrateLocationType {
  id: number
  name: string
}

export type NewCrateLocationType = Omit<CrateLocationType, 'id'>
