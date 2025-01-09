import { GridColDef } from '@mui/x-data-grid'
import { ShipmentDirectionEnum } from '../../types/shipment'

export const shipmentColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    valueGetter: (_value, row) => row.id,
  },
  {
    field: 'direction',
    headerName: 'Direction',
    flex: 1,
    valueGetter: (_value, row) => row.direction,
  },
  {
    field: 'sendDate',
    headerName: 'Send Date',
    flex: 1,
    valueGetter: (_value, row) => {
      return new Date(row.sendDate).toLocaleDateString()
    },
  },
  {
    field: 'receivedDate',
    headerName: 'Received Date',
    flex: 1,
    valueGetter: (_value, row) => {
      return new Date(row.sendDate).toLocaleDateString()
    },
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    flex: 1,
    valueGetter: (_value, row) => row.vendor.name,
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
    <select
      className="p-2 border-b-2 border-gray-300"
      name="direction"
      defaultValue=""
    >
      <option value="" disabled>
        direction
      </option>
      {Object.values(ShipmentDirectionEnum).map((direction) => (
        <option key={direction} value={direction}>
          {direction}
        </option>
      ))}
    </select>

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
