import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { MaterialCrateType } from '../../../types/materialCrate'
import { useState } from 'react'
import { columns } from '../../Tables/Columns/stock'
import { DataGrid } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'

interface MaterialCrateContentsProps {
  materialCrate: MaterialCrateType
}

const MaterialCrateContents = ({
  materialCrate,
}: MaterialCrateContentsProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

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
        <DialogTitle>Crate {materialCrate.crate.number} Materials</DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={materialCrate.stock}
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

export default MaterialCrateContents
