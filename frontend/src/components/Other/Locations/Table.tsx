// Table
import { columns } from './columns'

// Queries
import { useQuery } from '@tanstack/react-query'
import locationsService from '../../../services/locationsService'
import { LocationType } from '../../../types/location'
import { DataGrid } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const LocationsTable = () => {
  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<LocationType[]>({
    queryKey: ['locations'],
    queryFn: locationsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching locations data.</div>
  }

  return (
    <DataGrid
      rows={locations}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default LocationsTable
