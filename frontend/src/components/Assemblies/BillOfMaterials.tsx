import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { AssemblyType } from '../../types/assembly'
import { useState } from 'react'
import { name, quantity } from '../Tables/Columns/stock'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'
import LocateProjectMaterial from './LocateProjectMaterial'
import { AssemblyMaterialType } from '../../types/assemblyMaterial'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import cratesService from '../../services/cratesService'
import { CrateType } from '../../types/crate'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import assembliesService from '../../services/assembliesService'

interface BillOfMaterialsProps {
  assembly: AssemblyType
}

const BillOfMaterials = ({ assembly }: BillOfMaterialsProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const [cratesAfterPrefab, setCratesAfterPrefab] = useState<CrateType[]>([])

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const bulkUpdateCratesMutation = useMutation({
    mutationFn: (crates: CrateType[]) => cratesService.bulkUpdate(crates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crates'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Crate stock updated.',
          status: 'success',
        })
      )
      handleClose()
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

  const updateAssemblyMutation = useMutation({
    mutationFn: (assembly: AssemblyType) =>
      assembliesService.update(assembly.id, assembly),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assembly'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          message: 'Assembly updated.',
          status: 'success',
        })
      )
      handleClose()
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

  const handleSubmit = () => {
    setOpen(false)

    const updatedAssembly = {
      ...assembly,
      prefabricated: true,
    }

    updateAssemblyMutation.mutate(updatedAssembly)
    bulkUpdateCratesMutation.mutate(cratesAfterPrefab)
  }

  const columns = [
    name,
    quantity,
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams<AssemblyMaterialType>) => (
        <LocateProjectMaterial
          material={params.row.material}
          quantity={params.row.quantity}
          project={assembly.project}
          setCratesAfterPrefab={setCratesAfterPrefab}
        />
      ),
    },
  ]

  return (
    <>
      <Button fullWidth onClick={handleOpen}>
        View
      </Button>

      {/* Modal / Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        fullWidth
      >
        <DialogTitle>Assembly {assembly.code}</DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={assembly.billOfMaterials}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={pageSizeOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {!assembly.prefabricated && (
            <Button variant="contained" onClick={handleSubmit}>
              Prefabricate
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BillOfMaterials
