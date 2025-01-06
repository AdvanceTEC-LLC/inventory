// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import materialsService from '../../../services/materialsService'
import { MaterialType } from '../../../types/material'
import { DataGrid } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const MaterialsTable = () => {
  const {
    data: materials = [],
    isLoading,
    isError,
  } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching materials data.</div>
  }

  return (
    <DataGrid
      rows={materials}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default MaterialsTable
