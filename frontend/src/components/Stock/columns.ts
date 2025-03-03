import { GridColDef } from '@mui/x-data-grid'
import { StockType } from '../../types/stock'

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row: StockType) => row.material.name,
  },
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    flex: 1,
    valueGetter: (_value, row: StockType) => row.material.manufacturer.name,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    valueGetter: (_value, row: StockType) => row.quantity,
  },
]
