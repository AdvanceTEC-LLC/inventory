import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'
import { code, prefabricated } from '../../Tables/Columns/assemblies'

interface OutgoingCrateContentsProps {
  assemblyCrate: AssemblyCrateType
}

const OutgoingCrateContents = ({
  assemblyCrate,
}: OutgoingCrateContentsProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const columns: GridColDef[] = [code, prefabricated]

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
        <DialogTitle>Crate {assemblyCrate.crate.number} Assemblies</DialogTitle>
        <DialogContent>
          <DataGrid
            sx={{ border: 0 }}
            rows={assemblyCrate.assemblies}
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

export default OutgoingCrateContents
