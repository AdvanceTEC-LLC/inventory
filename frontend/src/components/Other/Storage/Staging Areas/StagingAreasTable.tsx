// Table
import { stagingAreaColumns } from './stagingAreaColumns'

// Queries
import { useQuery } from '@tanstack/react-query'
import stagingAreasService from '../../../../services/stagingAreasService'
import { StagingAreaType } from '../../../../types/stagingArea'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const paginationModel = { page: 0, pageSize: 5 }

const StagingAreasTable = () => {
  const {
    data: stagingAreas = [],
    isLoading,
    isError,
  } = useQuery<StagingAreaType[]>({
    queryKey: ['stagingAreas'],
    queryFn: stagingAreasService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching StagingAreas data.</div>
  }

  return (
    <DataGrid
      rows={stagingAreas}
      columns={stagingAreaColumns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default StagingAreasTable
