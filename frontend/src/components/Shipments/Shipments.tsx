import TwoColumnLayout from '../TwoColumnLayout'
import ProjectsColumn from '../Projects/Projects/ProjectsColumn'
import { ProjectProvider } from '../Projects/Projects/ProjectContext'
import ShipmentTabs from './ShipmentTabs'
import { ShipmentProvider } from './ShipmentContext'

const Shipments = () => {
  return (
    <ProjectProvider>
      <ShipmentProvider>
        <TwoColumnLayout left={<ProjectsColumn />} right={<ShipmentTabs />} />
      </ShipmentProvider>
    </ProjectProvider>
  )
}

export default Shipments
