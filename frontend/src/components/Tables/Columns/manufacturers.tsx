import { GridColDef } from '@mui/x-data-grid'
import { ManufacturerType } from '../../../types/manufacturer'

const name: GridColDef = {
  field: 'name',
  headerName: 'Name',
  flex: 1,
  valueGetter: (_value, row: ManufacturerType) => row.name,
}

export const columns: GridColDef[] = [name]
