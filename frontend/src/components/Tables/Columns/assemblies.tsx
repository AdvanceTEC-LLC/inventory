import { GridColDef } from '@mui/x-data-grid'

const code: GridColDef = {
  field: 'code',
  headerName: 'Code',
  flex: 1,
  valueGetter: (_value, row) => row.code,
}

const project: GridColDef = {
  field: 'project',
  headerName: 'Project',
  flex: 1,
  valueGetter: (_value, row) => `${row.project.number} ${row.project.name}`,
}

const prefabricated: GridColDef = {
  field: 'prefabricated',
  headerName: 'Prefabricated',
  flex: 1,
  valueGetter: (_value, row) => row.prefabricated,
}

export const columns: GridColDef[] = [code, project, prefabricated]
