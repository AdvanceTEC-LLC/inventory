import TwoColumnLayout from '../TwoColumnLayout'
import ProjectsColumn from '../Projects/Projects/ProjectsColumn'
import { ProjectProvider } from '../Projects/Projects/ProjectContext'
import ShipmentTabs from './ShipmentTabs'

const Shipments = () => {
  return (
    <ProjectProvider>
      <TwoColumnLayout left={<ProjectsColumn />} right={<ShipmentTabs />} />
    </ProjectProvider>
  )
}

export default Shipments
