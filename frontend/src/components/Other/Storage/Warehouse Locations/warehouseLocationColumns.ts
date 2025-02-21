import { GridColDef } from '@mui/x-data-grid'

export const warehouseLocationColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.name,
  },
]
