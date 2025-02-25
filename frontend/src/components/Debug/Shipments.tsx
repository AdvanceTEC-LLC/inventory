import { GridColDef } from '@mui/x-data-grid'

export const shipmentColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'trackingNumber',
    headerName: 'Tracking Number',
    flex: 1,
    valueGetter: (_value, row) => row.trackingNumber,
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

export const shipmentForm = (
  <div className="flex items-center gap-x-4">
    <input
      className="p-2 border-b-2 border-gray-300"
      type="date"
      name="sendDate"
    />
    <input
      className="p-2 border-b-2 border-gray-300"
      type="date"
      name="receivedDate"
    />

    <input
      className="p-2 border-b-2 border-gray-300"
      type="text"
      placeholder="project ID"
      name="projectId"
    />
    <input
      className="p-2 border-b-2 border-gray-300"
      type="text"
      placeholder="vendor ID"
      name="vendorId"
    />
  </div>
)
