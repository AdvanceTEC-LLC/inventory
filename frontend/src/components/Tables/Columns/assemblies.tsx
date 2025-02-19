import { GridColDef } from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

export const code: GridColDef = {
  field: 'code',
  headerName: 'Code',
  flex: 2,
  valueGetter: (_value, row) => row.code,
}

export const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 1,
  valueGetter: (_value, row) => `${row.project.number} ${row.project.name}`,
}

export const prefabricated: GridColDef = {
  field: 'prefabricated',
  headerName: 'Prefabricated',
  flex: 1,
  renderCell: (params) => {
    return params.value ? <CheckIcon /> : <ClearIcon color="disabled" />
  },
}

export const columns: GridColDef[] = [code, project, prefabricated]
