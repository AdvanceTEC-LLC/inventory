// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import manufacturersService from '../../../services/manufacturersService'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { ManufacturerType } from '../../../types/manufacturer'

const paginationModel = { page: 0, pageSize: 5 }

const ManufacturersTable = () => {
  const {
    data: manufacturers = [],
    isLoading,
    isError,
  } = useQuery<ManufacturerType[]>({
    queryKey: ['manufacturers'],
    queryFn: manufacturersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching Manufacturers data.</div>
  }

  return (
    <DataGrid
      rows={manufacturers}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default ManufacturersTable
