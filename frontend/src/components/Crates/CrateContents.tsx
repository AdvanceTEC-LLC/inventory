import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { CrateType } from '../../types/crate'
import { useState } from 'react'
import { columns } from '../Tables/Columns/stock'
import { DataGrid } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../Tables/pagination'

interface CrateContentsProps {
  crate: CrateType
}

const CrateContents = ({ crate }: CrateContentsProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
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
        <DialogTitle>Crate {crate.number} Contents</DialogTitle>
        <DialogContent>
          {crate && crate.stock.length > 0 ? (
            <DataGrid
              sx={{ border: 0 }}
              rows={crate.stock}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={pageSizeOptions}
            />
          ) : (
            <p>This crate is empty</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CrateContents
