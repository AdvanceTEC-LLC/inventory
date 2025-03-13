import { createContext, useContext, useState, ReactNode } from 'react'
import { ProjectType } from '../../../types/project'

interface ProjectContextType {
  project: ProjectType | null
  setProject: (project: ProjectType) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<ProjectType | null>(null)

  return (
    <ProjectContext.Provider value={{ project: project, setProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
