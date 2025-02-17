import { GridColDef } from '@mui/x-data-grid'

export const name: GridColDef = {
  field: 'name',
  headerName: 'Name',
  flex: 1,
  valueGetter: (_value, row) => row.name,
}

export const manufacturer: GridColDef = {
  field: 'manufacturer',
  headerName: 'Manufacturer',
  flex: 1,
  valueGetter: (_value, row) => row.manufacturer.name,
}

export const unit: GridColDef = {
  field: 'unit',
  headerName: 'Unit',
  flex: 1,
  valueGetter: (_value, row) => row.unit ?? 'ea',
}

export const columns: GridColDef[] = [name, manufacturer]
