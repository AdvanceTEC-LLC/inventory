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

interface BillOfMaterialsProps {
  assembly: AssemblyType
}

const BillOfMaterials = ({ assembly }: BillOfMaterialsProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    name,
    quantity,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams<AssemblyMaterialType>) => (
        <LocateProjectMaterial
          material={params.row.material}
          quantity={params.row.quantity}
          project={assembly.project}
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
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BillOfMaterials
