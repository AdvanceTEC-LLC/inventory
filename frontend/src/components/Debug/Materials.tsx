import { GridColDef } from '@mui/x-data-grid'
import { Header } from '../ATEC UI/Text'

export const materialColumns: GridColDef[] = [
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
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    flex: 1,
    valueGetter: (_value, row) => row.manufacturer.name,
  },
]

export const materialForm = (
  <div className="flex flex-col gap-y-4 w-full">
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="part number" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="part number"
        name="partNumber"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="description" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="description"
        name="description"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="thickness" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="thickness"
        name="thickness"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="width" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="width"
        name="width"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="length" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="length"
        name="length"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="top finish" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="top finish"
        name="topFinish"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="bottom finish" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="bottom finish"
        name="bottomFinish"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="x dimension" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="x dimension"
        name="xDimension"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="cutout" />
      <select className="p-2 border-b-2 border-gray-300" name="cutout">
        <option disabled value="">
          cutout
        </option>
        <option value="true">yes</option>
        <option value="false">no</option>
      </select>
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="tag" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="tag"
        name="tag"
      />
    </div>
    <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center">
      <Header text="vendor ID" />
      <input
        className="p-2 border-b-2 border-gray-300"
        type="text"
        placeholder="vendor ID"
        name="vendorId"
      />
    </div>
  </div>
)
