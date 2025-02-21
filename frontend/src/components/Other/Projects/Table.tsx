// Table
import { columns } from './columns'

// Queries
import projectsService from '../../../services/projectsService'
import FetchTable from '../../FetchTable'

const ProjectsTable = () => {
  return (
    <FetchTable
      title={'projects'}
      columns={columns}
      service={{
        getAll: projectsService.getAll,
      }}
    />
  )
}

export default ProjectsTable
