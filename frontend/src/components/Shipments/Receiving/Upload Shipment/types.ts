export interface ReceivedShipment {
  company: string
  project: Project
  vendor: Vendor
  sendDate: string
  receivedDate: string
  crates: Crate[]
}

export interface Project {
  number: number
  name: string
}

export interface ShipmentMaterial {
  number: string
  description: string
  thickness?: number
  width?: number
  length?: number
  squareFeet?: number
  topFinish?: string
  bottomFinish?: string
  xDimension?: number
  cutout?: string
  tag?: string
}

export interface Crate {
  number: string
  stock: Stock[]
}

export interface Stock {
  material: ShipmentMaterial
  quantity: number
}

export interface Vendor {
  name: string
}
