import { GridColDef } from '@mui/x-data-grid'
import { StockType } from '../../../types/stock'

export const name: GridColDef = {
  field: 'name',
  headerName: 'Name',
  flex: 3,
  valueGetter: (_value, row: StockType) => row.material.name,
}

export const manufacturer: GridColDef = {
  field: 'manufacturer',
  headerName: 'Manufacturer',
  flex: 2,
  valueGetter: (_value, row: StockType) => row.material.manufacturer.name,
}

export const unit: GridColDef = {
  field: 'unit',
  headerName: 'Unit',
  flex: 1,
  valueGetter: (_value, row: StockType) => row.material.unit,
}

export const quantity: GridColDef = {
  field: 'quantity',
  headerName: 'Quantity',
  flex: 1,
  valueGetter: (_value, row: StockType) => row.quantity,
}

export const columns: GridColDef[] = [name, manufacturer, unit, quantity]
