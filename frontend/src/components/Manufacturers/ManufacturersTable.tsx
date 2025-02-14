// Table

// Queries
import { useQuery } from '@tanstack/react-query'
import manufacturersService from '../../services/manufacturersService'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { ManufacturerType } from '../../types/manufacturer'
import { columns } from '../Tables/Columns/manufacturers'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'

const ManufacturersTable = () => {
  const { data: manufacturers = [] } = useQuery<ManufacturerType[]>({
    queryKey: ['manufacturers'],
    queryFn: manufacturersService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <DataGrid
      rows={manufacturers}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default ManufacturersTable
