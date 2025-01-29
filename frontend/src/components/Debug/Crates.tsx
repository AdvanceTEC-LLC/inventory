import { GridColDef } from '@mui/x-data-grid'

export const crateColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'number',
    headerName: 'Crate Number',
    flex: 1,
    valueGetter: (_value, row) => row.number,
  },
  {
    field: 'warehouseLocation',
    headerName: 'Warehouse Location',
    flex: 1,
    valueGetter: (_value, row) => row.warehouseLocation.name,
  },
  {
    field: 'shelfLocation',
    headerName: 'Shelf Location',
    flex: 1,
    valueGetter: (_value, row) => {
      if (!row.shelfLocation) return ''
      const { side, aisle, col, shelf } = row.shelfLocation
      return `Side ${side} Aisle ${aisle} ${col}x${shelf}`
    },
  },
  {
    field: 'stagingArea',
    headerName: 'Staging Area',
    flex: 1,
    valueGetter: (_value, row) => {
      if (!row.stagingArea) return ''
      return row.stagingArea.name
    },
  },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
    valueGetter: (_value, row) => {
      return `${row.project.number} ${row.project.name}`
    },
  },
]

export const crateForm = (
  <div className="flex items-center gap-x-4">
    <input
      className="p-2 border-b-2 border-gray-300"
      type="text"
      placeholder="number"
      name="number"
    />
    <input
      className="p-2 border-b-2 border-gray-300"
      type="text"
      placeholder="storage ID"
      name="storageId"
    />
    <input
      className="p-2 border-b-2 border-gray-300"
      type="text"
      placeholder="project ID"
      name="projectId"
    />
  </div>
)
