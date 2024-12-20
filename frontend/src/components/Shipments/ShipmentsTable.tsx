// Table
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'

// Queries
import { useQuery } from '@tanstack/react-query'
import shipmentsService from '../../services/shipmentsService'
import { ShipmentType } from '../../types/shipment'

const columns: GridColDef[] = [
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
    valueGetter: ({ number, name }) => `${number} ${name}`,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1,
    valueGetter: ({ name }) => name,
  },
]

const paginationModel = { page: 0, pageSize: 5 }

const ShipmentsTable = () => {
  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useQuery<ShipmentType[]>({
    queryKey: ['shipments'],
    queryFn: shipmentsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching shipment data.</div>
  }

  return (
    <DataGrid
      rows={shipments}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      sx={{ border: 0 }}
    />
  )
}

export default ShipmentsTable
