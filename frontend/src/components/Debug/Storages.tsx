import { GridColDef } from '@mui/x-data-grid'
import { Header } from '../ATEC UI/Text'

export const storageColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'aisle',
    headerName: 'Aisle',
    flex: 1,
    valueGetter: (_value, row) => row.material.aisle,
  },
  {
    field: 'col',
    headerName: 'Column',
    flex: 1,
    valueGetter: (_value, row) => row.material.col,
  },
  {
    field: 'shelf',
    headerName: 'Shelf',
    flex: 1,
    valueGetter: (_value, row) => row.shelf,
  },
]

export const storageForm = (
  <div className="flex flex-col gap-y-4 w-full">
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="aisle" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="aisle"
        name="aisle"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="column" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="column"
        name="column"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="shelf" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="shelf"
        name="shelf"
      />
    </div>
  </div>
)
