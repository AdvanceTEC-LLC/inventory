// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import storagesService from '../../../services/storagesService'
import { StorageType } from '../../../types/storage'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const StoragesTable = () => {
  const {
    data: storages = [],
    isLoading,
    isError,
  } = useQuery<StorageType[]>({
    queryKey: ['storages'],
    queryFn: storagesService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching storages data.</div>
  }

  return (
    <DataGrid
      rows={storages}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default StoragesTable
