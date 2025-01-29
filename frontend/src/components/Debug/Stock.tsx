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
    field: 'division',
    headerName: 'Division',
    flex: 1,
    valueGetter: (_value, row) => {
      if (!row.material.division) return ''
      return `${row.material.division.number} ${row.material.division.name}`
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]
