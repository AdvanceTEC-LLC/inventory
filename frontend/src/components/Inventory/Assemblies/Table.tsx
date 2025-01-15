// Table
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columns'
import { AssemblyType } from '../../../types/assembly'

// Queries
import { useQuery } from '@tanstack/react-query'
import assembliesService from '../../../services/assembliesService'
import { ProjectType } from '../../../types/project'
import { useState } from 'react'
import ProjectFilter from './ProjectFilter'

const paginationModel = { page: 0, pageSize: 5 }

const AssembliesTable = () => {
  const [project, setProject] = useState<ProjectType | null>(null)

  const {
    data: assemblies = [],
    isLoading: isLoading,
    isError: isError,
  } = useQuery<AssemblyType[]>({
    queryKey: ['assemblies'],
    queryFn: assembliesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching assemblies data.</div>
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ProjectFilter setProject={setProject} />

      <DataGrid
        rows={
          project
            ? assemblies.filter(
                (assembly) => assembly.project.number === project.number
              )
            : assemblies
        }
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default AssembliesTable
