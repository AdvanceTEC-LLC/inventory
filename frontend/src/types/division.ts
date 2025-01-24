export interface DivisionType {
  id: number
  number: number
  name: string
}

export interface NewDivisionType extends Omit<DivisionType, 'id'> {}
