import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'identifier',
    headerName: 'Assembly ID',
    flex: 1,
    valueGetter: (_value, row) => row.identifier,
  },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
    valueGetter: (_value, row) => `${row.project.number} ${row.project.name}`,
  },
]
