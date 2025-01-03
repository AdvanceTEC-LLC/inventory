// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import projectsService from '../../../services/projectsService'
import { ProjectType } from '../../../types/project'
import { DataGrid } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const ProjectsTable = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching projects data.</div>
  }

  return (
    <DataGrid
      rows={projects}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default ProjectsTable
