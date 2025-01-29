import { GridColDef } from '@mui/x-data-grid'

export const stagingAreaColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.name,
  },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
    valueGetter: (_value, row) => `${row.project.number} ${row.project.name}`,
  },
]
