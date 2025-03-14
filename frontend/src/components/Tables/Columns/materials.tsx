import { GridColDef } from '@mui/x-data-grid'
import { MaterialType } from '../../../types/material'

export const name: GridColDef = {
  field: 'name',
  headerName: 'Name',
  flex: 3,
  valueGetter: (_value, row: MaterialType) => row.name,
}

export const manufacturer: GridColDef = {
  field: 'manufacturer',
  headerName: 'Manufacturer',
  flex: 2,
  valueGetter: (_value, row: MaterialType) => row.manufacturer.name,
}

export const unit: GridColDef = {
  field: 'unit',
  headerName: 'Unit',
  width: 100,
  valueGetter: (_value, row: MaterialType) => row.unit,
}

export const columns: GridColDef[] = [name, manufacturer]
