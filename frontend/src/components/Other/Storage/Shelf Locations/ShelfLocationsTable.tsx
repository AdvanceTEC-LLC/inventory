// Table
import { shelfLocationColumns } from './shelfLocationColumns'

// Queries
import { useQuery } from '@tanstack/react-query'
import shelfLocationsService from '../../../../services/shelfLocationsService'
import { ShelfLocationType } from '../../../../types/shelfLocation'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const ShelfLocationsTable = () => {
  const {
    data: shelfLocations = [],
    isLoading,
    isError,
  } = useQuery<ShelfLocationType[]>({
    queryKey: ['shelfLocations'],
    queryFn: shelfLocationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching shelfLocations data.</div>
  }

  return (
    <DataGrid
      rows={shelfLocations}
      columns={shelfLocationColumns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default ShelfLocationsTable
