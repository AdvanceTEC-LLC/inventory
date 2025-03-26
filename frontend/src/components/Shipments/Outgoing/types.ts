import { Dayjs } from 'dayjs'
import { AssemblyCrateType } from '../../../types/assemblyCrate'

export interface SentShipmentType {
  transmittal: string
  sendDate: Dayjs
  assemblyCrates: AssemblyCrateType[]
}
