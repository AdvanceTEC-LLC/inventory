import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { ShipmentType } from '../../../types/shipment'
import { useState } from 'react'
import { number, location, opened } from '../../Tables/Columns/crates'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'
import { CrateType } from '../../../types/crate'
import CrateContents from '../../Projects/Crates/CrateContents'

interface ShipmentCratesProps {
  shipment: ShipmentType
}

const ShipmentCrates = ({ shipment }: ShipmentCratesProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const actions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<CrateType>) => (
      <CrateContents crate={params.row} />
    ),
  }

  const columns: GridColDef[] = [number, location, opened, actions]

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
        <DialogTitle>Shipment {shipment.trackingNumber} Crates</DialogTitle>
        <DialogContent>
          {shipment.crates.length > 0 ? (
            <DataGrid
              sx={{ border: 0 }}
              rows={shipment.crates}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={pageSizeOptions}
            />
          ) : (
            <p>This shipment had no shipments</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShipmentCrates
