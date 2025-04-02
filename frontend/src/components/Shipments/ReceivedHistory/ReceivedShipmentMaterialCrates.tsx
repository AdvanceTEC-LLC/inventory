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
import MaterialCrateContents from '../../Projects/MaterialCrates/MaterialCrateContents'
import { MaterialCrateType } from '../../../types/materialCrate'
import { ReceivedShipmentType } from '../../../types/receivedShipment'

interface ReceivedShipmentMaterialCratesProps {
  receivedShipment: ReceivedShipmentType
}

const ReceivedShipmentMaterialCrates = ({
  receivedShipment,
}: ReceivedShipmentMaterialCratesProps) => {
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
    renderCell: (params: GridRenderCellParams<MaterialCrateType>) => (
      <MaterialCrateContents materialCrate={params.row} />
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
        <DialogTitle>
          Shipment {receivedShipment.trackingNumber} Crates
        </DialogTitle>
        <DialogContent>
          {receivedShipment.materialCrates.length > 0 ? (
            <DataGrid
              sx={{ border: 0 }}
              rows={receivedShipment.materialCrates}
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

export default ReceivedShipmentMaterialCrates
