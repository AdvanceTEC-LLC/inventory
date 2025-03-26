import { AssemblyCrateType } from './assemblyCrate'
import { ProjectType } from './project'

export interface SentShipmentType {
  id: number
  project: ProjectType
  transmittal: string
  sendDate: Date
  delivered: boolean
  assemblyCrates: AssemblyCrateType[]
}

export interface NewSentShipmentType
  extends Omit<SentShipmentType, 'id' | 'project' | 'assemblyCrates'> {
  projectId: number
  assemblyCrates: AssemblyCrateType[]
}
