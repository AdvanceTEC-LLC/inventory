import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { columns } from '../Tables/Columns/materials'
import { paginationModel, pageSizeOptions } from '../Tables/pagination'
import { useQuery } from '@tanstack/react-query'
import materialsService from '../../services/materialsService'
import { MaterialType } from '../../types/material'

const MaterialsTable = () => {
  const { data: materials = [] } = useQuery<MaterialType[]>({
    queryKey: ['materials'],
    queryFn: materialsService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <DataGrid
      rows={materials}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  )
}

export default MaterialsTable
