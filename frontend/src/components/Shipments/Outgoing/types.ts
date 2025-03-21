import { Dayjs } from 'dayjs'
import { AssemblyCrateType } from '../../../types/assemblyCrate'

export interface SentShipmentType {
  trackingNumber: string
  sendDate: Dayjs
  assemblyCrates: AssemblyCrateType[]
}
