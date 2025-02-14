import { GridColDef } from '@mui/x-data-grid'

const name: GridColDef = {
  field: 'name',
  headerName: 'Name',
  flex: 1,
  valueGetter: (_value, row) => row.name,
}

const manufacturer: GridColDef = {
  field: 'manufacturer',
  headerName: 'Manufacturer',
  flex: 1,
  valueGetter: (_value, row) => row.manufacturer.name,
}

export const columns: GridColDef[] = [name, manufacturer]
