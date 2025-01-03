import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'number',
    headerName: 'Number',
    flex: 1,
    valueGetter: (_value, row) => row.number,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.name,
  },
]
