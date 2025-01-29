import { GridColDef } from '@mui/x-data-grid'

export const shelfLocationColumns: GridColDef[] = [
  {
    field: 'side',
    headerName: 'Side',
    flex: 1,
    valueGetter: (_value, row) => row.side,
  },
  {
    field: 'aisle',
    headerName: 'Aisle',
    flex: 1,
    valueGetter: (_value, row) => row.aisle,
  },
  {
    field: 'col',
    headerName: 'Column',
    flex: 1,
    valueGetter: (_value, row) => row.col,
  },
  {
    field: 'shelf',
    headerName: 'Shelf',
    flex: 1,
    valueGetter: (_value, row) => row.shelf,
  },
]
