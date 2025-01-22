import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'code',
    headerName: 'Code',
    flex: 1,
    valueGetter: (_value, row) => row.code,
  },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
    valueGetter: (_value, row) => `${row.project.number} ${row.project.name}`,
  },
]
