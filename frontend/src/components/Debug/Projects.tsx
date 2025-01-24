import { GridColDef } from '@mui/x-data-grid'
import { Header } from '../ATEC UI/Text'

export const projectColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'number',
    headerName: 'Number',
    flex: 1,
    valueGetter: (_value, row) => row.number,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.name,
  },
  {
    field: 'active',
    headerName: 'Active',
    flex: 1,
    valueGetter: (_value, row) => row.active,
  },
]

export const projectForm = (
  <div className="flex flex-col gap-y-4 w-full">
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="number" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="number"
        name="number"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="name" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="name"
        name="name"
      />
    </div>
  </div>
)
