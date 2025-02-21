import { ProjectType } from './project'

export interface StagingAreaType {
  id: number
  name: string
  project?: ProjectType
}

export interface NewStagingAreaType
  extends Omit<StagingAreaType, 'id' | 'project'> {
  projectId?: number
}
