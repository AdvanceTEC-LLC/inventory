export interface ShipmentType {
  type?: string
  project?: ProjectType
  crates?: CrateType[]
}

export interface ReceivedShipmentType {
  shipment?: ShipmentType
  receivedDate?: Date
  manufacturer?: ManufacturerType
}

export interface SentShipmentType {
  shipment: ShipmentType
  sendDate: Date
  delivered: boolean
}

export interface CrateType {
  id: number
  number?: string
  stock?: StockType[]
  open: boolean
}

export interface ProjectType {
  number: number
  name: string
}

export interface StockType {
  id: number
  material?: MaterialType
  quantity?: number
}

export interface MaterialType {
  manufacturer: ManufacturerType
  name: string
  unit: string
}

export interface ManufacturerType {
  name: string
}
