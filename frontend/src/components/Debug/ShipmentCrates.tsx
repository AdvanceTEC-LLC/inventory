import { GridColDef } from '@mui/x-data-grid'

export const shipmentCrateColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'shipmentId',
    headerName: 'Shipment ID',
    flex: 1,
    valueGetter: (_value, row) => row.shipment.id,
  },
  {
    field: 'crateId',
    headerName: 'Crate ID',
    flex: 1,
    valueGetter: (_value, row) => row.crate.id,
  },
]
