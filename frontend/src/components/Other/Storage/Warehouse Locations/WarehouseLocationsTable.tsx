// Table
import { warehouseLocationColumns } from './warehouseLocationColumns'

// Queries
import { useQuery } from '@tanstack/react-query'
import warehouseLocationsService from '../../../../services/warehouseLocationsService'
import { WarehouseLocationType } from '../../../../types/warehouseLocation'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const WarehouseLocationsTable = () => {
  const {
    data: warehouseLocations = [],
    isLoading,
    isError,
  } = useQuery<WarehouseLocationType[]>({
    queryKey: ['warehouseLocations'],
    queryFn: warehouseLocationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching warehouseLocations data.</div>
  }

  return (
    <DataGrid
      rows={warehouseLocations}
      columns={warehouseLocationColumns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default WarehouseLocationsTable
