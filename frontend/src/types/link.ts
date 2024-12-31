import { ReactElement } from 'react'

export interface LinkType {
  name: string
  path: string
  dropdown?: LinkType[]
  element?: ReactElement
}
