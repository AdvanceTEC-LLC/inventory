import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useState } from 'react'
import { number, location } from '../../Tables/Columns/assemblyCrates'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { pageSizeOptions, paginationModel } from '../../Tables/pagination'
import AssemblyCrateContents from '../../Projects/AssemblyCrates/AssemblyCrateContents'
import { AssemblyCrateType } from '../../../types/assemblyCrate'
import { SentShipmentType } from '../../../types/sentShipment'

interface SentShipmentsAssemblyCratesProps {
  sentShipment: SentShipmentType
}

const SentShipmentsAssemblyCrates = ({
  sentShipment,
}: SentShipmentsAssemblyCratesProps) => {
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
    renderCell: (params: GridRenderCellParams<AssemblyCrateType>) => (
      <AssemblyCrateContents assemblyCrate={params.row} />
    ),
  }

  const columns: GridColDef[] = [number, location, actions]

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
        <DialogTitle>Shipment {sentShipment.transmittal} Crates</DialogTitle>
        <DialogContent>
          {sentShipment.assemblyCrates.length > 0 ? (
            <DataGrid
              sx={{ border: 0 }}
              rows={sentShipment.assemblyCrates}
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

export default SentShipmentsAssemblyCrates
