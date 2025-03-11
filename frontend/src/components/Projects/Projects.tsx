import TwoColumnLayout from '../TwoColumnLayout'
import ProjectsColumn from './Projects/ProjectsColumn'
import ProjectTabs from './ProjectTabs'
import { ProjectProvider } from './Projects/ProjectContext'

const Projects = () => {
  return (
    <ProjectProvider>
      <TwoColumnLayout left={<ProjectsColumn />} right={<ProjectTabs />} />
    </ProjectProvider>
  )
}

export default Projects
