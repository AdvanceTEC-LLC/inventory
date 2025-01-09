import { CreateVendorType, VendorType } from './vendor'

export interface MaterialType {
  id: number
  partNumber: string
  description: string
  thickness?: number
  width?: number
  length?: number
  squareFeet?: number
  topFinish?: string
  bottomFinish?: string
  xDimension?: number
  cutout?: boolean
  tag?: string
  vendor: VendorType
}

export interface CreateMaterialType {
  partNumber: string
  description: string
  thickness?: number
  width?: number
  length?: number
  topFinish?: string
  bottomFinish?: string
  xDimension?: number
  cutout?: boolean
  tag?: string
  vendor: CreateVendorType
}
