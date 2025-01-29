import { GridColDef } from '@mui/x-data-grid'

export const divisionColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
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
