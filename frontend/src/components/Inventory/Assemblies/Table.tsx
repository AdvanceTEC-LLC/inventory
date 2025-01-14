// Table
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './columns'
import { AssemblyType } from '../../../types/assembly'

// Queries
import { useQuery } from '@tanstack/react-query'
import assembliesService from '../../../services/assembliesService'

const paginationModel = { page: 0, pageSize: 5 }

const AssembliesTable = () => {
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
    <DataGrid
      rows={assemblies}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default AssembliesTable
