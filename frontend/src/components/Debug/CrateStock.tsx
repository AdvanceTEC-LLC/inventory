import { GridColDef } from '@mui/x-data-grid'

export const crateStockColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'crateId',
    headerName: 'Crate ID',
    flex: 1,
    valueGetter: (_value, row) => row.crate.id,
  },
  {
    field: 'stockId',
    headerName: 'Stock ID',
    flex: 1,
    valueGetter: (_value, row) => row.stock.id,
  },
]
