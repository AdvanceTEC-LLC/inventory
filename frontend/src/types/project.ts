export interface ProjectType {
  id: number
  number: number
  name: string
  active: boolean
}

export interface NewProjectType extends Omit<ProjectType, 'id' | 'active'> {
  active?: boolean
}
