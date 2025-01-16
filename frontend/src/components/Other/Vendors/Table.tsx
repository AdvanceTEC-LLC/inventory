// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import vendorsService from '../../../services/vendorsService'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { VendorType } from '../../../types/vendor'

const paginationModel = { page: 0, pageSize: 5 }

const VendorsTable = () => {
  const {
    data: vendors = [],
    isLoading,
    isError,
  } = useQuery<VendorType[]>({
    queryKey: ['vendors'],
    queryFn: vendorsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching vendors data.</div>
  }

  return (
    <DataGrid
      rows={vendors}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default VendorsTable
