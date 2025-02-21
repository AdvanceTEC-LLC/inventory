import { GridColDef } from '@mui/x-data-grid'

export const stockColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.material.name,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]
