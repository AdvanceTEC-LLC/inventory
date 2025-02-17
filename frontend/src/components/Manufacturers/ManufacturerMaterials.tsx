import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMaterials } from '../../hooks/useMaterialsHook'
import { ManufacturerType } from '../../types/manufacturer'
import { name, unit } from '../Tables/Columns/materials'
import { paginationModel, pageSizeOptions } from '../Tables/pagination'
import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import materialsService from '../../services/materialsService'
import { AppDispatch } from '../../store'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'

const ManufacturerMaterials = ({
  selectedManufacturer,
}: {
  selectedManufacturer: ManufacturerType | null
}) => {
  const { data: materials = [] } = useMaterials()

  const filteredMaterials = materials.filter(
    (material) => material.manufacturer.id === selectedManufacturer?.id
  )

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  // Delete Material Mutation
  const deleteMaterialMutation = useMutation({
    mutationFn: (id: number) => materialsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Material deleted.',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      dispatch(
        notifyWithTimeout({
          title: error.name,
          message: error.message,
          status: 'error',
        })
      )
    },
  })

  // Columns including delete button
  const columns: GridColDef[] = [
    name,
    unit,
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => deleteMaterialMutation.mutate(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <DataGrid
      rows={filteredMaterials}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={pageSizeOptions}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  )
}

export default ManufacturerMaterials
