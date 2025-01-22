import { CrateType, CreateCrateType } from './crate'
import { CreateProjectType, ProjectType } from './project'
import { CreateVendorType, VendorType } from './vendor'

export enum ShipmentDirectionEnum {
  In = 'In',
  Out = 'Out',
}

export interface ShipmentType {
  id: number
  direction: ShipmentDirectionEnum
  sendDate: Date
  receivedDate: Date
  project: ProjectType
  vendor: VendorType
  crates: CrateType[]
}

export interface CreateShipmentType {
  direction: ShipmentDirectionEnum
  sendDate: Date
  receivedDate?: Date
  project: CreateProjectType
  vendor?: CreateVendorType
  crates: CreateCrateType[]
}

export interface CreateSendingShipmentType {
  direction: ShipmentDirectionEnum.Out
  sendDate: Date
  project: ProjectType
  crates: CrateType[]
  vendor: CreateVendorType
}
