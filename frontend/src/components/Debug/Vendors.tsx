import { GridColDef } from '@mui/x-data-grid'
import { Header } from '../ATEC UI/Text'

export const vendorColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    valueGetter: (_value, row) => row.name,
  },
]

export const vendorForm = (
  <div className="flex flex-col gap-y-4 w-full">
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
