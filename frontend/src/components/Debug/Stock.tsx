import { GridColDef } from '@mui/x-data-grid'

export const stockColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'partNumber',
    headerName: 'Part Number',
    flex: 1,
    valueGetter: (_value, row) => row.material.partNumber,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    valueGetter: (_value, row) => row.material.description,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row) => row.quantity,
  },
]
