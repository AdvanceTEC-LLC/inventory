import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.material.name,
  },
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    flex: 1,
    valueGetter: (_value, row) => row.material.manufacturer.name,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]
